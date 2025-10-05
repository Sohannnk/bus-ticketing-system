const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus',
    required: [true, 'Bus is required']
  },
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    required: [true, 'Route is required']
  },
  departureTime: {
    type: String, // Format: "HH:mm"
    required: [true, 'Departure time is required'],
    match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide time in HH:mm format']
  },
  arrivalTime: {
    type: String, // Format: "HH:mm"
    required: [true, 'Arrival time is required'],
    match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide time in HH:mm format']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  availableSeats: {
    type: Number,
    required: true,
    min: 0
  },
  seatPrices: {
    window: {
      type: Number,
      default: 0 // Additional price for window seats
    },
    aisle: {
      type: Number,
      default: 0 // Additional price for aisle seats
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // Track bookings for this schedule
  bookedSeats: [{
    seatNumber: {
      type: String,
      required: true
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking'
    }
  }]
}, {
  timestamps: true
});

// Compound index for efficient queries
scheduleSchema.index({ bus: 1, date: 1 });
scheduleSchema.index({ route: 1, date: 1 });
scheduleSchema.index({ departureTime: 1, date: 1 });

// Virtual for checking if schedule is full
scheduleSchema.virtual('isFull').get(function() {
  return this.availableSeats === 0;
});

// Ensure available seats doesn't exceed total seats
scheduleSchema.pre('save', function(next) {
  if (this.availableSeats > this.bus?.totalSeats) {
    this.availableSeats = this.bus?.totalSeats || this.availableSeats;
  }
  next();
});

module.exports = mongoose.model('Schedule', scheduleSchema);
