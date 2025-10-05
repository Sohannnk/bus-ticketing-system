const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  operatorName: {
    type: String,
    required: [true, 'Operator name is required'],
    trim: true
  },
  operatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Operator',
    required: true
  },
  busNumber: {
    type: String,
    required: [true, 'Bus number is required'],
    unique: true,
    uppercase: true
  },
  busType: {
    type: String,
    enum: ['AC', 'Non-AC', 'Sleeper', 'Semi-Sleeper', 'Volvo', 'Mercedes'],
    required: true
  },
  totalSeats: {
    type: Number,
    required: [true, 'Total seats is required'],
    min: [1, 'Must have at least 1 seat'],
    max: [60, 'Cannot have more than 60 seats']
  },
  seatLayout: {
    rows: {
      type: Number,
      required: true,
      min: 1
    },
    columns: {
      type: Number,
      required: true,
      min: 2,
      max: 6
    }
  },
  amenities: [{
    type: String,
    enum: ['WiFi', 'Charging Point', 'AC', 'Water Bottle', 'Blanket', 'TV', 'GPS', 'Emergency Exit']
  }],
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  images: [{
    type: String // URLs to bus images
  }]
}, {
  timestamps: true
});

// Index for better query performance
busSchema.index({ operatorName: 1, busType: 1 });
busSchema.index({ busNumber: 1 });

module.exports = mongoose.model('Bus', busSchema);
