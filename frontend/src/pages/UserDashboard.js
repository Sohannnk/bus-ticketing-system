import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMapPin, FiClock, FiEye, FiLogOut, FiEdit, FiPlus, FiFilter, FiCheck } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth();
  const [user, setUser] = useState(authUser);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('bookings');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Check if user is logged in using context
    if (!authUser) {
      navigate('/login');
      return;
    }

    setUser(authUser);

    // Mock booking data (in a real app, fetch from API)
    setBookings([
      {
        id: 'BK001',
        status: 'confirmed',
        bus: {
          operatorName: 'RedBus Express',
          busType: 'AC Sleeper',
          busNumber: 'RJ14PA1234'
        },
        route: {
          from: { city: 'Delhi', state: 'Delhi' },
          to: { city: 'Jaipur', state: 'Rajasthan' }
        },
        journey: {
          date: '2024-01-15',
          departureTime: '22:00',
          arrivalTime: '06:00'
        },
        passengers: [
          { seatNumber: '5', name: 'John Doe' },
          { seatNumber: '6', name: 'Jane Doe' }
        ],
        totalAmount: 1000,
        bookingDate: '2024-01-10'
      },
      {
        id: 'BK002',
        status: 'cancelled',
        bus: {
          operatorName: 'City Link Travels',
          busType: 'Volvo AC',
          busNumber: 'DL01CA5678'
        },
        route: {
          from: { city: 'Mumbai', state: 'Maharashtra' },
          to: { city: 'Pune', state: 'Maharashtra' }
        },
        journey: {
          date: '2024-01-20',
          departureTime: '08:00',
          arrivalTime: '11:00'
        },
        passengers: [
          { seatNumber: '12', name: 'John Doe' }
        ],
        totalAmount: 450,
        bookingDate: '2024-01-12'
      }
    ]);

    setLoading(false);
  }, [authUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEditProfile = () => {
    // In a real app, navigate to profile edit page
    alert('Profile edit functionality would be implemented here');
  };

  const handleViewTicket = (bookingId) => {
    navigate(`/booking-confirmation?bookingId=${bookingId}&amount=${bookings.find(b => b.id === bookingId)?.totalAmount}`);
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      // In a real app, call cancel booking API
      setBookings(bookings.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: 'cancelled' }
          : booking
      ));
      alert('Booking cancelled successfully');
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <span className="ml-3 text-lg">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-5"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')`
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name || 'User'}!</h1>
          <p className="text-gray-600 mt-1">Manage your bookings and profile</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <FiLogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors duration-200 ${
            activeTab === 'bookings'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          My Bookings
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors duration-200 ${
            activeTab === 'profile'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Profile
        </button>
      </div>

      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <div>
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FiUser className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Confirmed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {bookings.filter(b => b.status === 'confirmed').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FiCheck className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Cancelled</p>
                  <p className="text-2xl font-bold text-red-600">
                    {bookings.filter(b => b.status === 'cancelled').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <FiUser className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-primary-600">
                    ₹{bookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + b.totalAmount, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <FiUser className="w-6 h-6 text-primary-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FiFilter className="w-5 h-5 text-gray-400" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Bookings</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <FiPlus className="w-4 h-4" />
              Book New Ticket
            </button>
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg shadow-md">
                <div className="text-6xl mb-4">🎫</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
                <p className="text-gray-600 mb-6">
                  {filter === 'all' ? 'You haven\'t made any bookings yet.' : `No ${filter} bookings found.`}
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg"
                >
                  Book Your First Ticket
                </button>
              </div>
            ) : (
              filteredBookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Booking Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                        <span className="text-sm text-gray-500">PNR: {booking.id}</span>
                      </div>

                      <div className="flex items-center gap-4 mb-3">
                        <div className="text-center">
                          <div className="font-semibold text-lg">{booking.route.from.city}</div>
                          <div className="text-sm text-gray-600">{booking.route.from.state}</div>
                        </div>

                        <div className="flex-shrink-0">
                          <FiMapPin className="w-5 h-5 text-gray-400" />
                        </div>

                        <div className="text-center">
                          <div className="font-semibold text-lg">{booking.route.to.city}</div>
                          <div className="text-sm text-gray-600">{booking.route.to.state}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <FiClock className="w-4 h-4 text-gray-400" />
                          <span>{booking.journey.date} • {booking.journey.departureTime}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Bus:</span> {booking.bus.operatorName}
                        </div>
                        <div>
                          <span className="text-gray-600">Seats:</span> {booking.passengers.map(p => p.seatNumber).join(', ')}
                        </div>
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="lg:text-right">
                      <div className="mb-4">
                        <div className="text-2xl font-bold text-gray-900">₹{booking.totalAmount}</div>
                        <div className="text-sm text-gray-600">Booked on {new Date(booking.bookingDate).toLocaleDateString()}</div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewTicket(booking.id)}
                          className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                          <FiEye className="w-4 h-4" />
                          View
                        </button>

                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && user && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
              <button
                onClick={handleEditProfile}
                className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <FiEdit className="w-4 h-4" />
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg bg-gray-50">
                    <FiUser className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{user.name || 'Not provided'}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg bg-gray-50">
                    <FiUser className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{user.email || 'Not provided'}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg bg-gray-50">
                    <FiUser className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{user.phone || 'Not provided'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-2">Account Statistics</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Total Bookings:</span>
                      <span className="font-medium">{bookings.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Successful Trips:</span>
                      <span className="font-medium">{bookings.filter(b => b.status === 'confirmed').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Total Spent:</span>
                      <span className="font-medium">₹{bookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + b.totalAmount, 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Member Since:</span>
                      <span className="font-medium">January 2024</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-green-900 mb-2">Travel Preferences</h3>
                  <div className="space-y-2 text-sm text-green-700">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Preferred bus type: AC Sleeper</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Favorite routes: Delhi → Jaipur</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Travel frequency: Monthly</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {bookings.slice(0, 3).map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${booking.status === 'confirmed' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {booking.route.from.city} → {booking.route.to.city}
                        </div>
                        <div className="text-sm text-gray-600">
                          {booking.journey.date} • ₹{booking.totalAmount}
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default UserDashboard;
