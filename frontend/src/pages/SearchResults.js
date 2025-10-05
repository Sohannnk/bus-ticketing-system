import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiClock, FiUsers, FiStar, FiWifi, FiZap, FiDroplet } from 'react-icons/fi';
import axios from 'axios';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get search parameters from URL
  const searchParams = new URLSearchParams(location.search);
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const date = searchParams.get('date');
  const passengers = searchParams.get('passengers') || 1;

  useEffect(() => {
    const searchBuses = async () => {
      if (!from || !to || !date) {
        setError('Missing search parameters');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/buses/search?from=${from}&to=${to}&date=${date}&passengers=${passengers}`);

        if (response.data.success) {
          setBuses(response.data.data.schedules);
        } else {
          setError(response.data.message || 'Failed to fetch buses');
        }
      } catch (err) {
        console.error('Search error:', err);
        setError(err.response?.data?.message || 'Failed to search buses');
      } finally {
        setLoading(false);
      }
    };

    searchBuses();
  }, [from, to, date, passengers]);

  const handleBookNow = (bus) => {
    navigate(`/bus/${bus.id}/seats?date=${date}&passengers=${passengers}`);
  };

  const formatTime = (time) => {
    return time;
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <FiWifi className="w-4 h-4" />;
      case 'charging point': return <FiZap className="w-4 h-4" />;
      case 'water bottle': return <FiDroplet className="w-4 h-4" />;
      default: return <FiStar className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <span className="ml-3 text-lg">Searching for buses...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Search Error</h2>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bus from {from} to {to}
        </h1>
        <p className="text-gray-600">
          {date} • {passengers} Passenger{passengers > 1 ? 's' : ''}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Found {buses.length} bus{buses.length !== 1 ? 'es' : ''} • {Math.floor(Math.random() * 50) + 10} routes available
        </p>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {buses.map((bus, index) => (
          <div key={bus.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Bus Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {bus.bus.operatorName}
                    </h3>
                    <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                      {bus.bus.busType}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* Departure */}
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Departure</div>
                      <div className="font-semibold text-lg">{formatTime(bus.departureTime)}</div>
                      <div className="text-sm text-gray-600">{bus.route.from.city}</div>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <FiClock className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                        <div className="text-sm text-gray-500">{bus.duration}</div>
                      </div>
                    </div>

                    {/* Arrival */}
                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-1">Arrival</div>
                      <div className="font-semibold text-lg">{formatTime(bus.arrivalTime)}</div>
                      <div className="text-sm text-gray-600">{bus.route.to.city}</div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm text-gray-500">Amenities:</span>
                    <div className="flex gap-2">
                      {bus.bus.amenities.slice(0, 3).map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-gray-600">
                          {getAmenityIcon(amenity)}
                          <span className="text-xs">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price & Booking */}
                <div className="lg:text-right">
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      ₹{bus.price}
                    </div>
                    <div className="text-sm text-gray-500">per person</div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <FiUsers className="w-4 h-4 text-green-600" />
                      <span className="text-green-600 font-medium">
                        {bus.availableSeats} seats available
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookNow(bus)}
                    disabled={bus.availableSeats === 0}
                    className={`w-full lg:w-auto px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      bus.availableSeats > 0
                        ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {bus.availableSeats > 0 ? 'Book Now' : 'Sold Out'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {buses.length === 0 && !loading && !error && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🚌</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No buses found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search criteria or date</p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg"
          >
            Search Again
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
