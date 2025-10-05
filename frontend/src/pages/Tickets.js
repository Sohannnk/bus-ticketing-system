import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiMapPin, FiClock, FiUsers } from 'react-icons/fi';

const Tickets = () => {
  const popularRoutes = [
    {
      from: 'Delhi',
      to: 'Jaipur',
      duration: '5-6 hrs',
      price: 450,
      buses: ['AC Sleeper', 'Volvo AC', 'Non-AC Seater']
    },
    {
      from: 'Mumbai',
      to: 'Pune',
      duration: '3-4 hrs',
      price: 350,
      buses: ['AC Seater', 'Non-AC Sleeper', 'Volvo Multi-Axle']
    },
    {
      from: 'Bangalore',
      to: 'Chennai',
      duration: '6-7 hrs',
      price: 600,
      buses: ['AC Sleeper', 'Volvo AC', 'Bharat Benz']
    },
    {
      from: 'Kolkata',
      to: 'Bhubaneswar',
      duration: '7-8 hrs',
      price: 550,
      buses: ['AC Seater', 'Non-AC Sleeper', 'Volvo AC']
    }
  ];

  const features = [
    {
      icon: <FiSearch className="w-6 h-6" />,
      title: "Easy Search",
      description: "Find buses between any cities with real-time availability"
    },
    {
      icon: <FiMapPin className="w-6 h-6" />,
      title: "Live Tracking",
      description: "Track your bus location in real-time during journey"
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: "Instant Booking",
      description: "Book tickets in seconds with instant confirmation"
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "Multiple Options",
      description: "Choose from AC, Non-AC, Sleeper, and Seater buses"
    }
  ];

  const getRouteImage = (from, to) => {
    const routeKey = `${from.toLowerCase()}-${to.toLowerCase()}`;
    const imageMap = {
      'delhi-jaipur': '1558618049-bebda4e38f71',
      'mumbai-pune': '1544620347-c4fd4a3d5957',
      'bangalore-chennai': '1507003211169-0a1dd7228f2d',
      'kolkata-bhubaneswar': '1570126618953-d437176e8c79',
      'hyderabad-vijayawada': '1469474968028-56623f02e42e',
      'ahmedabad-vadodara': '1551288049-bebda4e38f71'
    };
    return imageMap[routeKey] || '1558618049-bebda4e38f71'; // Default fallback image
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-3"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')`
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>

      <div className="relative">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')`
            }}
          ></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Find Your Perfect <span className="text-yellow-300">Bus Journey</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
                Discover comfortable and affordable bus travel across India with real-time seat availability and instant booking confirmation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/"
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg text-lg"
                >
                  <FiSearch className="inline w-5 h-5 mr-2" />
                  Search Buses Now
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Popular Routes */}
        <section className="relative py-20 bg-white">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Popular <span className="text-primary-500">Bus Routes</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose from our most popular routes with frequent departures and competitive prices
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularRoutes.map((route, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer group overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => window.open(`/search?from=${route.from}&to=${route.to}&date=${new Date().toISOString().split('T')[0]}&passengers=1`, '_self')}
                >
                  {/* Route Background Image */}
                  <div
                    className="h-32 bg-cover bg-center relative"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-${getRouteImage(route.from, route.to)}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 text-white">
                      <h3 className="text-lg font-bold drop-shadow-lg">
                        {route.from} → {route.to}
                      </h3>
                      <p className="text-sm opacity-90">{route.duration}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-3 text-sm text-gray-600 mb-4">
                      <div className="flex items-center justify-between">
                        <span>Starting from:</span>
                        <span className="font-bold text-green-600 text-lg">₹{route.price}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Available: {route.buses.join(', ')}
                      </div>
                    </div>

                    <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Book Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-20 bg-gray-50">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose <span className="text-primary-500">BusTick</span>?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Experience the future of bus travel with our cutting-edge platform designed for your convenience and comfort
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

        {/* CTA Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1570126618953-d437176e8c79?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')`
            }}
          ></div>

          <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Ready to Book Your <span className="text-yellow-300">Next Journey</span>?
              </h2>
              <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join thousands of happy travelers who trust BusTick for their bus travel needs. Book your tickets now!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/"
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-4 px-10 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg text-lg"
                >
                  <FiSearch className="inline w-5 h-5 mr-2" />
                  Book Tickets Now
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-10 rounded-lg transition-all duration-200 text-lg"
                >
                  Contact Support
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tickets;
