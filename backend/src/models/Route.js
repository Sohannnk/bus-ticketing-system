const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  from: {
    city: {
      type: String,
      required: [true, 'From city is required'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'From state is required'],
      trim: true
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  to: {
    city: {
      type: String,
      required: [true, 'To city is required'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'To state is required'],
      trim: true
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  distance: {
    type: Number, // in kilometers
    required: [true, 'Distance is required'],
    min: [1, 'Distance must be at least 1 km']
  },
  estimatedDuration: {
    type: Number, // in minutes
    required: [true, 'Estimated duration is required'],
    min: [30, 'Duration must be at least 30 minutes']
  },
  routeType: {
    type: String,
    enum: ['Express', 'Superfast', 'Ordinary', 'Luxury'],
    default: 'Express'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // Store popular routes for quick access
  isPopular: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Create compound index for from-to route search
routeSchema.index({ 'from.city': 1, 'to.city': 1 });
routeSchema.index({ isActive: 1, isPopular: 1 });

module.exports = mongoose.model('Route', routeSchema);
