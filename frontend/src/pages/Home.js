import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMapPin, FiCalendar, FiUsers, FiStar, FiClock, FiArrowRight, FiCreditCard, FiShield, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchData.from && searchData.to && searchData.date) {
      navigate(`/search?from=${searchData.from}&to=${searchData.to}&date=${searchData.date}&passengers=${searchData.passengers}`);
    }
  };

  const features = [
    {
      icon: <FiShield className="w-6 h-6" />,
      title: "Secure Booking",
      description: "Your payments and personal information are protected with industry-standard security"
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: "Instant Confirmation",
      description: "Get your tickets confirmed immediately after successful payment"
    },
    {
      icon: <FiCreditCard className="w-6 h-6" />,
      title: "Multiple Payment Options",
      description: "Pay using UPI, credit cards, debit cards, or net banking"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Mumbai",
      rating: 5,
      comment: "Amazing service! Booked tickets in minutes and got instant confirmation. Highly recommended!"
    },
    {
      name: "Raj Kumar",
      location: "Delhi",
      rating: 5,
      comment: "Very user-friendly platform. The seat selection feature is fantastic and prices are competitive."
    },
    {
      name: "Priya Sharma",
      location: "Bangalore",
      rating: 5,
      comment: "Excellent customer support and seamless booking experience. Will definitely use again!"
    }
  ];

  const popularRoutes = [
    {
      from: 'Delhi',
      to: 'Jaipur',
      duration: '5-6 hrs',
      price: 450
    },
    {
      from: 'Mumbai',
      to: 'Pune',
      duration: '3-4 hrs',
      price: 350
    },
    {
      from: 'Bangalore',
      to: 'Chennai',
      duration: '6-7 hrs',
      price: 600
    },
    {
      from: 'Kolkata',
      to: 'Bhubaneswar',
      duration: '7-8 hrs',
      price: 550
    },
    {
      from: 'Hyderabad',
      to: 'Vijayawada',
      duration: '5-6 hrs',
      price: 400
    },
    {
      from: 'Ahmedabad',
      to: 'Vadodara',
      duration: '2-3 hrs',
      price: 250
    }
  ];

  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleRouteClick = (route) => {
    setSelectedRoute(route);
    setSearchData(prev => ({
      ...prev,
      from: route.from,
      to: route.to,
      passengers: 1
    }));

    // Scroll to search form
    setTimeout(() => {
      document.querySelector('#search-form').scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white overflow-hidden">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')` 
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              className="text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Travel Made <span className="text-yellow-300">Easy</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-100">
                Book Your Bus Tickets Anytime, Anywhere
              </p>
              <p className="text-lg mb-8 max-w-xl mx-auto lg:mx-0 text-primary-200 leading-relaxed">
                Discover comfortable journeys with our extensive network of trusted bus operators across India. Experience seamless booking with real-time seat availability.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => document.querySelector('#search-form').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <FiSearch className="inline w-5 h-5 mr-2" />
                  Search Buses
                </button>
                <button
                  onClick={() => document.querySelector('#popular-routes').scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-all duration-200"
                >
                  Browse Popular Routes
                </button>
              </div>
            </motion.div>

            {/* Right Content - Search Form */}
            <motion.div 
              className="lg:ml-auto"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div id="search-form" className={`bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-lg mx-auto ${selectedRoute ? 'ring-2 ring-primary-500' : ''}`}>
                {selectedRoute && (
                  <div className="mb-4 p-3 bg-primary-50 border border-primary-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-primary-700">
                        <FiMapPin className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Route selected: {selectedRoute.from} → {selectedRoute.to}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedRoute(null);
                          setSearchData(prev => ({
                            ...prev,
                            from: '',
                            to: ''
                          }));
                        }}
                        className="text-xs text-primary-600 hover:text-primary-800 underline"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  {selectedRoute ? `Book ${selectedRoute.from} → ${selectedRoute.to}` : 'Find Your Journey'}
                </h3>
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* From */}
                    <div className="relative">
                      <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="from"
                        value={searchData.from}
                        onChange={handleInputChange}
                        placeholder="From (City)"
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                        required
                      />
                    </div>

                    {/* To */}
                    <div className="relative">
                      <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="to"
                        value={searchData.to}
                        onChange={handleInputChange}
                        placeholder="To (City)"
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Date */}
                    <div className="relative">
                      <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="date"
                        name="date"
                        value={searchData.date}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>

                    {/* Passengers */}
                    <div className="relative">
                      <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select
                        name="passengers"
                        value={searchData.passengers}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 appearance-none"
                      >
                        {[1,2,3,4,5,6].map(num => (
                          <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <FiSearch className="w-5 h-5" />
                    <span>Search Buses</span>
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section id="popular-routes" className="relative py-20 bg-gray-50">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular <span className="text-primary-500">Bus Routes</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Click on any route below to pre-fill your journey details. Just add your travel date and search for buses!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularRoutes.map((route, index) => (
              <motion.div
                key={index}
                className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer group ${selectedRoute?.from === route.from && selectedRoute?.to === route.to ? 'ring-2 ring-primary-500 bg-primary-50' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => handleRouteClick(route)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                        <FiMapPin className="w-6 h-6" />
                      </div>
                      {selectedRoute?.from === route.from && selectedRoute?.to === route.to && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                          <FiCheck className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                          {route.from} → {route.to}
                        </h3>
                        <p className="text-sm text-gray-600">Popular Route</p>
                      </div>
                    </div>
                    <FiArrowRight className="w-6 h-6 text-gray-400 group-hover:text-primary-500 transition-colors duration-200" />
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{route.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Starting from:</span>
                      <span className="font-medium text-green-600">₹{route.price}</span>
                    </div>
                  </div>

                  <button className="w-full mt-4 bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Search Buses
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative py-20 bg-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-primary-500">BusTick</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the future of bus travel with our cutting-edge platform designed for your convenience and comfort
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="text-center p-8 rounded-xl hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 hover:from-primary-50 hover:to-white group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with Background */}
      <section className="relative py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')` 
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-4xl font-bold text-yellow-400 mb-2">10K+</div>
              <div className="text-gray-300">Happy Customers</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-4xl font-bold text-yellow-400 mb-2">500+</div>
              <div className="text-gray-300">Bus Routes</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-4xl font-bold text-yellow-400 mb-2">50+</div>
              <div className="text-gray-300">Cities Covered</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="text-4xl font-bold text-yellow-400 mb-2">24/7</div>
              <div className="text-gray-300">Customer Support</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section with Background */}
      <section className="relative py-20 bg-gray-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')`
          }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our <span className="text-primary-500">Customers Say</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers who trust us for their journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-center leading-relaxed italic">
                  "{testimonial.comment}"
                </p>
                <div className="border-t pt-6 text-center">
                  <p className="font-semibold text-gray-900 text-lg">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Background */}
      <section className="relative py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')` 
          }}
        ></div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to Start Your <span className="text-yellow-300">Journey</span>?
            </h2>
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of happy travelers who trust BusTick for their travel needs. Book your next adventure today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.querySelector('#search-form').scrollIntoView({ behavior: 'smooth' })}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-4 px-10 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg text-lg"
              >
                <FiSearch className="inline w-5 h-5 mr-2" />
                Book Your Ticket Now
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-10 rounded-lg transition-all duration-200 text-lg">
                Contact Support
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 
