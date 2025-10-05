import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiDownload, FiMail, FiPhone, FiMapPin, FiClock, FiUser, FiCheck, FiArrowLeft, FiShare } from 'react-icons/fi';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(null);

  // Get query parameters
  const searchParams = new URLSearchParams(location.search);
  const bookingId = searchParams.get('bookingId');
  const amount = searchParams.get('amount');

  useEffect(() => {
    // In a real app, you would fetch booking details from the backend using the bookingId
    // For now, we'll use mock data
    if (bookingId) {
      // Simulate fetching booking details
      setBookingDetails({
        id: bookingId,
        status: 'confirmed',
        bus: {
          id: 'BUS001',
          operatorName: 'RedBus Express',
          busType: 'AC Sleeper',
          busNumber: 'RJ14PA1234'
        },
        route: {
          from: { city: 'Delhi', state: 'Delhi' },
          to: { city: 'Jaipur', state: 'Rajasthan' },
          distance: 280
        },
        journey: {
          date: '2024-01-15',
          departureTime: '22:00',
          arrivalTime: '06:00',
          duration: '8h 0m'
        },
        passengers: [
          { seatNumber: '5', name: 'John Doe', age: 28, gender: 'male' },
          { seatNumber: '6', name: 'Jane Doe', age: 25, gender: 'female' }
        ],
        totalAmount: parseInt(amount) || 1000,
        paymentStatus: 'paid',
        bookingDate: new Date().toISOString()
      });
    }
  }, [bookingId, amount]);

  const handleDownloadTicket = () => {
    try {
      // Create a simple HTML structure for the ticket
      const ticketHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>E-Ticket - ${bookingDetails.id}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
            .header { background: #10b981; color: white; padding: 15px; text-align: center; }
            .ticket-info { border: 2px solid #10b981; padding: 20px; margin: 20px 0; }
            .route { display: flex; justify-content: space-between; align-items: center; margin: 20px 0; }
            .passenger { margin: 10px 0; padding: 10px; background: #f9f9f9; }
            .footer { margin-top: 20px; padding: 10px; background: #f0f0f0; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>BusTick E-Ticket</h1>
            <p>PNR: ${bookingDetails.id}</p>
          </div>

          <div class="ticket-info">
            <div class="route">
              <div>
                <strong>From:</strong> ${bookingDetails.route.from.city}<br>
                <strong>Date:</strong> ${bookingDetails.journey.date}<br>
                <strong>Time:</strong> ${bookingDetails.journey.departureTime}
              </div>
              <div>→</div>
              <div>
                <strong>To:</strong> ${bookingDetails.route.to.city}<br>
                <strong>Arrival:</strong> ${bookingDetails.journey.arrivalTime}
              </div>
            </div>

            <p><strong>Bus:</strong> ${bookingDetails.bus.operatorName} (${bookingDetails.bus.busType})</p>
            <p><strong>Bus Number:</strong> ${bookingDetails.bus.busNumber}</p>

            <h3>Passengers:</h3>
            ${bookingDetails.passengers.map(p => `
              <div class="passenger">
                <strong>Seat ${p.seatNumber}:</strong> ${p.name} (${p.age}yo, ${p.gender})
              </div>
            `).join('')}

            <p><strong>Total Amount:</strong> ₹${bookingDetails.totalAmount}</p>
            <p><strong>Payment Status:</strong> ${bookingDetails.paymentStatus.toUpperCase()}</p>
          </div>

          <div class="footer">
            <p><strong>Important:</strong> Please carry a valid ID proof and arrive 15 minutes before departure.</p>
            <p><strong>Contact:</strong> +91-1800-XXX-XXXX | support@bustick.com</p>
            <p><strong>Booked on:</strong> ${new Date(bookingDetails.bookingDate).toLocaleDateString()}</p>
          </div>
        </body>
        </html>
      `;

      // Create a blob with the HTML content
      const blob = new Blob([ticketHTML], { type: 'text/html' });

      // Create a download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `BusTicket_${bookingDetails.id}_${bookingDetails.route.from.city}_to_${bookingDetails.route.to.city}.html`;

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up
      URL.revokeObjectURL(url);

      alert('E-ticket downloaded successfully!');
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  const handleShareTicket = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Bus Ticket Confirmation',
        text: `Booking confirmed! PNR: ${bookingId}`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!bookingDetails) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <span className="ml-3 text-lg">Loading booking details...</span>
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
          backgroundImage: `url('https://images.unsplash.com/photo-1570126618953-d437176e8c79?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')`
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-white via-green-50 to-white"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-primary-600 hover:text-primary-700 mb-4"
        >
          <FiArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheck className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your bus ticket has been successfully booked</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* E-Ticket */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Ticket Header */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-1">E-Ticket</h2>
                  <p className="text-primary-100">BusTick Confirmation</p>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-90">PNR</div>
                  <div className="text-xl font-bold">{bookingDetails.id.slice(-8)}</div>
                </div>
              </div>
            </div>

            {/* Ticket Body */}
            <div className="p-6">
              {/* Journey Details */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1 text-center">
                    <div className="text-sm text-gray-500 mb-1">From</div>
                    <div className="font-semibold text-lg">{bookingDetails.route.from.city}</div>
                    <div className="text-sm text-gray-600">{bookingDetails.route.from.state}</div>
                  </div>

                  <div className="flex-shrink-0">
                    <FiMapPin className="w-6 h-6 text-primary-500" />
                  </div>

                  <div className="flex-1 text-center">
                    <div className="text-sm text-gray-500 mb-1">To</div>
                    <div className="font-semibold text-lg">{bookingDetails.route.to.city}</div>
                    <div className="text-sm text-gray-600">{bookingDetails.route.to.state}</div>
                  </div>
                </div>

                <div className="text-center mb-4">
                  <div className="text-sm text-gray-500 mb-1">Departure Date & Time</div>
                  <div className="font-semibold">{bookingDetails.journey.date} at {bookingDetails.journey.departureTime}</div>
                </div>
              </div>

              {/* Bus Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Bus Operator</div>
                    <div className="font-medium">{bookingDetails.bus.operatorName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Bus Type</div>
                    <div className="font-medium">{bookingDetails.bus.busType}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Bus Number</div>
                    <div className="font-medium">{bookingDetails.bus.busNumber}</div>
                  </div>
                </div>
              </div>

              {/* Passenger Details */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Passenger Details</h3>
                <div className="space-y-2">
                  {bookingDetails.passengers.map((passenger, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div>
                        <span className="font-medium">Seat {passenger.seatNumber}</span>
                        <span className="text-gray-600 ml-2">- {passenger.name}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {passenger.age}yo, {passenger.gender}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Journey Timeline */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Journey Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-medium">Departure from {bookingDetails.route.from.city}</div>
                      <div className="text-sm text-gray-600">{bookingDetails.journey.departureTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-medium">Arrival at {bookingDetails.route.to.city}</div>
                      <div className="text-sm text-gray-600">{bookingDetails.journey.arrivalTime}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 text-center py-2">
                    Duration: {bookingDetails.journey.duration} • Distance: {bookingDetails.route.distance} km
                  </div>
                </div>
              </div>

              {/* Important Instructions */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Important Instructions</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Please arrive at the boarding point 15 minutes before departure</li>
                  <li>• Carry a valid ID proof for all passengers</li>
                  <li>• E-ticket and ID proof are mandatory for boarding</li>
                  <li>• No refund will be provided for cancellations within 2 hours of departure</li>
                </ul>
              </div>
            </div>

            {/* Ticket Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Booked on: {new Date(bookingDetails.bookingDate).toLocaleDateString()}</span>
                <span>Payment Status: {bookingDetails.paymentStatus.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Sidebar */}
        <div className="space-y-6">
          {/* Payment Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Fare ({bookingDetails.passengers.length} × ₹500)</span>
                <span className="font-medium">₹{bookingDetails.passengers.length * 500}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST (18%)</span>
                <span className="font-medium">₹{(bookingDetails.totalAmount - bookingDetails.passengers.length * 500).toFixed(2)}</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-bold">
                <span>Total Paid:</span>
                <span className="text-green-600">₹{bookingDetails.totalAmount}</span>
              </div>
              <div className="text-sm text-green-600 font-medium">
                ✓ Payment Successful
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={handleDownloadTicket}
                className="w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-lg transition-colors duration-200"
              >
                <FiDownload className="w-5 h-5" />
                Download E-Ticket
              </button>

              <button
                onClick={handleShareTicket}
                className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg transition-colors duration-200"
              >
                <FiShare className="w-5 h-5" />
                Share Ticket
              </button>

              <button
                onClick={() => navigate('/dashboard')}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition-colors duration-200"
              >
                View All Bookings
              </button>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
            <p className="text-sm text-blue-700 mb-3">
              For any queries regarding your booking, contact our support team.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-blue-700">
                <FiPhone className="w-4 h-4" />
                <span>+91-1800-XXX-XXXX</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700">
                <FiMail className="w-4 h-4" />
                <span>support@bustick.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Cancellation Policy</h4>
            <ul className="text-gray-600 space-y-1">
              <li>• Free cancellation up to 2 hours before departure</li>
              <li>• 50% refund for cancellations 2-24 hours before</li>
              <li>• No refund for cancellations within 2 hours</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Boarding Instructions</h4>
            <ul className="text-gray-600 space-y-1">
              <li>• Report to boarding point 15 minutes early</li>
              <li>• Carry original ID proof</li>
              <li>• Show e-ticket for boarding</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">During Journey</h4>
            <ul className="text-gray-600 space-y-1">
              <li>• Follow COVID-19 safety guidelines</li>
              <li>• Keep your belongings safe</li>
              <li>• Contact driver for any assistance</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Contact Information</h4>
            <ul className="text-gray-600 space-y-1">
              <li>• Emergency: +91-1800-XXX-XXXX</li>
              <li>• Customer Care: Available 24/7</li>
              <li>• Email support within 24 hours</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default BookingConfirmation;
