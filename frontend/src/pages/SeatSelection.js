import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiArrowLeft, FiCheck, FiStar, FiWifi, FiCoffee } from 'react-icons/fi';
import axios from 'axios';

const SeatSelection = () => {
  const { busId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [busDetails, setBusDetails] = useState(null);
  const [seatLayout, setSeatLayout] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTicketType, setSelectedTicketType] = useState(null);

  // Get query parameters
  const searchParams = new URLSearchParams(location.search);
  const date = searchParams.get('date');
  const passengers = parseInt(searchParams.get('passengers')) || 1;

  // Mock ticket types for different bus classes
  const ticketTypes = [
    {
      id: 'ac-sleeper',
      name: 'AC Sleeper',
      price: 800,
      features: ['AC', 'Bed-like seats', 'Blanket & Pillow', 'Charging point'],
      description: 'Most comfortable option with bed-like seats',
      icon: <FiStar className="w-5 h-5" />
    },
    {
      id: 'ac-seater',
      name: 'AC Seater',
      price: 500,
      features: ['AC', 'Comfortable seats', 'Charging point', 'Reading light'],
      description: 'Comfortable AC seats for day travel',
      icon: <FiWifi className="w-5 h-5" />
    },
    {
      id: 'non-ac-sleeper',
      name: 'Non-AC Sleeper',
      price: 600,
      features: ['Bed-like seats', 'Blanket & Pillow', 'Budget friendly'],
      description: 'Economical option with sleeping berths',
      icon: <FiStar className="w-5 h-5" />
    },
    {
      id: 'non-ac-seater',
      name: 'Non-AC Seater',
      price: 300,
      features: ['Comfortable seats', 'Budget friendly', 'Basic amenities'],
      description: 'Basic seats for short distance travel',
      icon: <FiCoffee className="w-5 h-5" />
    }
  ];

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        setLoading(true);

        // Fetch seat layout
        const response = await axios.get(`http://localhost:5000/api/buses/${busId}/seats`);

        if (response.data.success) {
          setBusDetails(response.data.data.bus);
          setSeatLayout(response.data.data.seatLayout);
        } else {
          setError(response.data.message || 'Failed to fetch bus details');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.response?.data?.message || 'Failed to fetch bus details');
      } finally {
        setLoading(false);
      }
    };

    if (busId) {
      fetchBusDetails();
    }
  }, [busId]);

  const handleSeatClick = (rowIndex, seatIndex) => {
    const seat = seatLayout[rowIndex][seatIndex];

    if (seat.isBooked) return;

    const seatKey = `${rowIndex}-${seatIndex}`;

    if (selectedSeats.includes(seatKey)) {
      // Deselect seat
      setSelectedSeats(selectedSeats.filter(s => s !== seatKey));
      const newPassengerDetails = { ...passengerDetails };
      delete newPassengerDetails[seatKey];
      setPassengerDetails(newPassengerDetails);
    } else {
      // Select seat (check if we've reached passenger limit)
      if (selectedSeats.length >= passengers) {
        return;
      }

      setSelectedSeats([...selectedSeats, seatKey]);

      // Initialize passenger details for this seat
      setPassengerDetails({
        ...passengerDetails,
        [seatKey]: {
          name: '',
          age: '',
          gender: 'male'
        }
      });
    }
  };

  const handlePassengerDetailChange = (seatKey, field, value) => {
    setPassengerDetails({
      ...passengerDetails,
      [seatKey]: {
        ...passengerDetails[seatKey],
        [field]: value
      }
    });
  };

  const handleProceedToPayment = async () => {
    if (!selectedTicketType) {
      alert('Please select a ticket type first');
      return;
    }

    // Validate passenger details
    for (const seatKey of selectedSeats) {
      const details = passengerDetails[seatKey];
      if (!details.name || !details.age || !details.gender) {
        alert(`Please fill in all details for seat ${seatKey}`);
        return;
      }
    }

    try {
      // Create booking
      const bookingData = {
        busId,
        date,
        selectedSeats,
        passengerDetails,
        ticketType: selectedTicketType,
        totalAmount: selectedSeats.length * (ticketTypes.find(t => t.id === selectedTicketType)?.price || 500)
      };

      // In a real app, this would create the booking and redirect to payment
      // For now, we'll redirect directly to a mock payment page
      navigate(`/payment?booking=${JSON.stringify(bookingData)}`);
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to create booking. Please try again.');
    }
  };

  const getSeatTypeColor = (seatType) => {
    switch (seatType) {
      case 'window': return 'border-green-300 hover:border-green-500';
      case 'aisle': return 'border-blue-300 hover:border-blue-500';
      default: return 'border-gray-300 hover:border-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <span className="ml-3 text-lg">Loading seat layout...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-primary-600 hover:text-primary-700 mb-4"
        >
          <FiArrowLeft className="w-5 h-5 mr-2" />
          Back to Search Results
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Select Seats</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{busDetails?.operatorName}</span>
            <span>•</span>
            <span>{busDetails?.busType}</span>
            <span>•</span>
            <span>{date}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Ticket Type Selection */}
          {!selectedTicketType && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Choose Your Ticket Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ticketTypes.map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicketType(ticket.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedTicketType === ticket.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        selectedTicketType === ticket.id
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {ticket.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{ticket.name}</h3>
                        <p className="text-sm text-gray-600">₹{ticket.price}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{ticket.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {ticket.features.map((feature, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Seat Layout */}
          {selectedTicketType && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Choose Your Seats</h2>
                <button
                  onClick={() => setSelectedTicketType(null)}
                  className="text-primary-600 hover:text-primary-700 text-sm"
                >
                  Change Ticket Type
                </button>
              </div>

              {/* Selected Ticket Info */}
              <div className="mb-6 p-3 bg-primary-50 border border-primary-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-primary-900">
                      Selected: {ticketTypes.find(t => t.id === selectedTicketType)?.name}
                    </span>
                    <p className="text-sm text-primary-700">
                      ₹{ticketTypes.find(t => t.id === selectedTicketType)?.price} per seat
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary-600">
                      ₹{selectedSeats.length * (ticketTypes.find(t => t.id === selectedTicketType)?.price || 0)}
                    </div>
                    <div className="text-sm text-primary-600">{selectedSeats.length} seat(s)</div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex gap-6 mb-8 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-500 bg-primary-500 rounded"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-400 bg-gray-400 rounded"></div>
                  <span>Booked</span>
                </div>
              </div>

              {/* Seat Layout */}
              <div className="space-y-4">
                {seatLayout.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex justify-center gap-2">
                    {row.map((seat, seatIndex) => {
                      const seatKey = `${rowIndex}-${seatIndex}`;
                      const isSelected = selectedSeats.includes(seatKey);

                      return (
                        <button
                          key={seatIndex}
                          onClick={() => handleSeatClick(rowIndex, seatIndex)}
                          disabled={seat.isBooked}
                          className={`w-12 h-12 border-2 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                            seat.isBooked
                              ? 'bg-gray-400 border-gray-400 text-white cursor-not-allowed'
                              : isSelected
                              ? 'bg-primary-500 border-primary-500 text-white hover:bg-primary-600'
                              : `${getSeatTypeColor(seat.seatType)} hover:bg-gray-50`
                          }`}
                        >
                          {seat.seatNumber}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Selected Seats Summary */}
              {selectedSeats.length > 0 && (
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Selected Seats ({selectedSeats.length}/{passengers})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSeats.map(seatKey => {
                      const [rowIndex, seatIndex] = seatKey.split('-');
                      const seat = seatLayout[parseInt(rowIndex)]?.[parseInt(seatIndex)];
                      return seat ? (
                        <span key={seatKey} className="px-2 py-1 bg-primary-100 text-primary-800 rounded text-sm">
                          {seat.seatNumber}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          {/* Booking Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
            {selectedTicketType && (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ticket Type:</span>
                  <span className="font-medium">{ticketTypes.find(t => t.id === selectedTicketType)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Selected Seats:</span>
                  <span className="font-medium">{selectedSeats.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per seat:</span>
                  <span className="font-medium">₹{ticketTypes.find(t => t.id === selectedTicketType)?.price}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount:</span>
                  <span className="text-primary-600">₹{selectedSeats.length * (ticketTypes.find(t => t.id === selectedTicketType)?.price || 0)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Passenger Details Form */}
          {selectedSeats.length > 0 && selectedTicketType && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Passenger Details</h3>
              <div className="space-y-6">
                {selectedSeats.map(seatKey => {
                  const [rowIndex, seatIndex] = seatKey.split('-');
                  const seat = seatLayout[parseInt(rowIndex)]?.[parseInt(seatIndex)];

                  return (
                    <div key={seatKey} className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">
                        Seat {seat?.seatNumber} - Passenger Details
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={passengerDetails[seatKey]?.name || ''}
                            onChange={(e) => handlePassengerDetailChange(seatKey, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Enter full name"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Age
                            </label>
                            <input
                              type="number"
                              value={passengerDetails[seatKey]?.age || ''}
                              onChange={(e) => handlePassengerDetailChange(seatKey, 'age', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                              placeholder="Age"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Gender
                            </label>
                            <select
                              value={passengerDetails[seatKey]?.gender || 'male'}
                              onChange={(e) => handlePassengerDetailChange(seatKey, 'gender', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleProceedToPayment}
                className="w-full mt-6 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Proceed to Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
