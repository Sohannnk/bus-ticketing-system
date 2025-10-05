const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  schedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule',
    required: [true, 'Schedule is required']
  },
  seats: [{
    seatNumber: {
      type: String,
      required: true
    },
    seatType: {
      type: String,
      enum: ['window', 'aisle', 'middle'],
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total amount cannot be negative']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'refunded'],
    default: 'pending'
  },
  paymentId: {
    type: String,
    required: function() {
      return this.status === 'confirmed';
    }
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'upi', 'netbanking', 'wallet'],
    required: function() {
      return this.status === 'confirmed';
    }
  },
  bookingReference: {
    type: String,
    unique: true,
    required: true
  },
  passengerDetails: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    age: {
      type: Number,
      required: true,
      min: 1,
      max: 120
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true
    },
    seatNumber: {
      type: String,
      required: true
    }
  }],
  contactDetails: {
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, 'Phone number must be 10 digits']
    }
  },
  specialRequests: {
    type: String,
    maxlength: [500, 'Special requests cannot exceed 500 characters']
  },
  cancellationReason: {
    type: String,
    maxlength: [500, 'Cancellation reason cannot exceed 500 characters']
  },
  cancelledAt: Date,
  refundAmount: {
    type: Number,
    min: 0,
    default: 0
  }
}, {
  timestamps: true
});

// Generate unique booking reference
bookingSchema.pre('save', function(next) {
  if (!this.bookingReference) {
    this.bookingReference = 'BK' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
  }
  next();
});

// Index for better query performance
bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ bookingReference: 1 });
bookingSchema.index({ schedule: 1, status: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
