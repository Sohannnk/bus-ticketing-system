import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMapPin, FiUsers, FiStar, FiWifi, FiZap, FiShield, FiPhone, FiMail } from 'react-icons/fi';

const BusDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [busDetails, setBusDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock bus data (in a real app, fetch from API)
    const mockBusData = {
      id: id,
      operatorName: 'RedBus Express',
      busType: 'AC Sleeper',
      busNumber: 'RJ14PA1234',
      totalSeats: 36,
      availableSeats: 28,
      amenities: ['WiFi', 'Charging Point', 'Water Bottle', 'Blanket', 'Pillow'],
      rating: 4.5,
      totalReviews: 1250,
      route: {
        from: { city: 'Delhi', state: 'Delhi', terminal: 'Kashmere Gate ISBT' },
        to: { city: 'Jaipur', state: 'Rajasthan', terminal: 'Sindhi Camp Bus Stand' },
        distance: '280 km',
        duration: '5-6 hours'
      },
      schedule: {
        departureTime: '22:00',
        arrivalTime: '04:00',
        frequency: 'Daily'
      },
      pricing: {
        basePrice: 450,
        gst: 81,
        totalPrice: 531
      },
      policies: {
        cancellation: 'Free cancellation up to 2 hours before departure',
        boarding: 'Report 15 minutes before departure',
        luggage: 'One handbag and one suitcase allowed'
      }
    };

    setTimeout(() => {
      setBusDetails(mockBusData);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleSeatSelection = (seats) => {
    navigate(`/bus/${id}/seats?date=${new Date().toISOString().split('T')[0]}&passengers=${seats.length}`);
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <FiWifi className="w-5 h-5" />;
      case 'charging point': return <FiZap className="w-5 h-5" />;
      case 'water bottle': return <FiShield className="w-5 h-5" />;
      default: return <FiStar className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen relative">
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-3"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            <span className="ml-3 text-lg">Loading bus details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!busDetails) {
    return (
      <div className="min-h-screen relative">
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-3"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-red-50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Bus Not Found</h2>
            <p className="text-red-600 mb-4">The requested bus could not be found.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-3"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')`
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-primary-600 hover:text-primary-700 mb-4"
          >
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Back to Search Results
          </button>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{busDetails.operatorName}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full font-medium">
                    {busDetails.busType}
                  </span>
                  <span>•</span>
                  <span>{busDetails.busNumber}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <FiStar className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{busDetails.rating}</span>
                    <span>({busDetails.totalReviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="lg:text-right">
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  ₹{busDetails.pricing.basePrice}
                </div>
                <div className="text-sm text-gray-600">per person</div>
                <div className="text-sm text-green-600 font-medium">
                  {busDetails.availableSeats} seats available
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Route Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Journey Details</h2>

              <div className="flex items-center gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{busDetails.schedule.departureTime}</div>
                  <div className="text-sm text-gray-600">Departure</div>
                </div>

                <div className="flex-1 relative">
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
                    <FiMapPin className="w-6 h-6 text-gray-400" />
                    <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  </div>
                  <div className="text-center text-sm text-gray-600 mt-2">
                    {busDetails.route.distance} • {busDetails.route.duration}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{busDetails.schedule.arrivalTime}</div>
                  <div className="text-sm text-gray-600">Arrival</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-semibold text-green-800">From</span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">{busDetails.route.from.city}</div>
                  <div className="text-sm text-gray-600">{busDetails.route.from.state}</div>
                  <div className="text-sm text-gray-600">{busDetails.route.from.terminal}</div>
                </div>

                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="font-semibold text-red-800">To</span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">{busDetails.route.to.city}</div>
                  <div className="text-sm text-gray-600">{busDetails.route.to.state}</div>
                  <div className="text-sm text-gray-600">{busDetails.route.to.terminal}</div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {busDetails.amenities.map((amenity, index) => (
                  <div key={index} className="flex flex-col items-center p-3 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors duration-200">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mb-2 text-primary-600">
                      {getAmenityIcon(amenity)}
                    </div>
                    <span className="text-xs text-gray-700 text-center">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Travel Policies</h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <FiShield className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-800">Cancellation Policy</span>
                  </div>
                  <p className="text-sm text-blue-700">{busDetails.policies.cancellation}</p>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <FiMapPin className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">Boarding Instructions</span>
                  </div>
                  <p className="text-sm text-green-700">{busDetails.policies.boarding}</p>
                </div>

                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <FiUsers className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-purple-800">Luggage Policy</span>
                  </div>
                  <p className="text-sm text-purple-700">{busDetails.policies.luggage}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Book Your Seat</h3>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Fare:</span>
                  <span className="font-medium">₹{busDetails.pricing.basePrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%):</span>
                  <span className="font-medium">₹{busDetails.pricing.gst}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary-600">₹{busDetails.pricing.totalPrice}</span>
                </div>
              </div>

              <button
                onClick={() => handleSeatSelection([1])}
                className="w-full mt-6 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Select Seats
              </button>

              <div className="mt-4 text-center">
                <div className="text-sm text-gray-600">Available Seats</div>
                <div className="text-2xl font-bold text-green-600">{busDetails.availableSeats}/{busDetails.totalSeats}</div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <FiPhone className="w-4 h-4" />
                  <span>+91-1800-XXX-XXXX</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <FiMail className="w-4 h-4" />
                  <span>support@bustick.com</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  For urgent queries, call our 24/7 customer support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusDetails;
