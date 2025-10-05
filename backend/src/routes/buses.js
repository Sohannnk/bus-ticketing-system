const express = require('express');

const router = express.Router();

// Mock data for testing
const mockBuses = [
  {
    id: '1',
    operatorName: 'RedBus Express',
    busType: 'AC Sleeper',
    departureTime: '22:00',
    arrivalTime: '06:00',
    price: 850,
    availableSeats: 15,
    duration: '8h 0m'
  },
  {
    id: '2',
    operatorName: 'City Link Travels',
    busType: 'Volvo AC',
    departureTime: '23:30',
    arrivalTime: '07:30',
    price: 720,
    availableSeats: 22,
    duration: '8h 0m'
  },
  {
    id: '3',
    operatorName: 'National Travels',
    busType: 'AC Seater',
    departureTime: '21:00',
    arrivalTime: '05:00',
    price: 550,
    availableSeats: 8,
    duration: '8h 0m'
  }
];

// Search buses endpoint with mock data
router.get('/search', async (req, res) => {
  try {
    const { from, to, date, passengers = 1 } = req.query;

    // Validate required parameters
    if (!from || !to || !date) {
      return res.status(400).json({
        success: false,
        message: 'From, to, and date are required parameters'
      });
    }

    // Return mock data for now
    const results = mockBuses.map(bus => ({
      id: bus.id,
      bus: {
        id: bus.id,
        operatorName: bus.operatorName,
        busType: bus.busType,
        totalSeats: 40,
        amenities: ['WiFi', 'Charging Point', 'AC', 'Water Bottle']
      },
      route: {
        from: { city: from, state: 'State' },
        to: { city: to, state: 'State' },
        distance: 400,
        estimatedDuration: 480
      },
      departureTime: bus.departureTime,
      arrivalTime: bus.arrivalTime,
      date: date,
      price: bus.price,
      availableSeats: bus.availableSeats,
      duration: bus.duration
    }));

    res.status(200).json({
      success: true,
      data: {
        route: {
          from: { city: from, state: 'State' },
          to: { city: to, state: 'State' },
          distance: 400
        },
        schedules: results,
        totalResults: results.length
      }
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get bus details with seat layout
router.get('/:busId/seats', async (req, res) => {
  try {
    const { busId } = req.params;

    // Mock seat layout
    const seatLayout = [
      [
        { seatNumber: '1', isBooked: false, seatType: 'window' },
        { seatNumber: '2', isBooked: true, seatType: 'aisle' },
        { seatNumber: '3', isBooked: false, seatType: 'aisle' },
        { seatNumber: '4', isBooked: false, seatType: 'window' }
      ],
      [
        { seatNumber: '5', isBooked: false, seatType: 'window' },
        { seatNumber: '6', isBooked: false, seatType: 'aisle' },
        { seatNumber: '7', isBooked: true, seatType: 'aisle' },
        { seatNumber: '8', isBooked: false, seatType: 'window' }
      ],
      [
        { seatNumber: '9', isBooked: false, seatType: 'window' },
        { seatNumber: '10', isBooked: false, seatType: 'aisle' },
        { seatNumber: '11', isBooked: false, seatType: 'aisle' },
        { seatNumber: '12', isBooked: true, seatType: 'window' }
      ]
    ];

    res.status(200).json({
      success: true,
      data: {
        bus: {
          id: busId,
          operatorName: 'Sample Bus Operator',
          busType: 'AC Sleeper',
          totalSeats: 40,
          amenities: ['WiFi', 'AC', 'Charging Point']
        },
        seatLayout
      }
    });

  } catch (error) {
    console.error('Seat layout error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
