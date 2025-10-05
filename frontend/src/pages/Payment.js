import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiCreditCard, FiSmartphone, FiShield, FiCheck, FiArrowLeft } from 'react-icons/fi';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
    upiId: ''
  });
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    // Get booking data from URL parameters
    const searchParams = new URLSearchParams(location.search);
    const bookingParam = searchParams.get('booking');

    if (bookingParam) {
      try {
        const booking = JSON.parse(decodeURIComponent(bookingParam));
        setBookingData(booking);
      } catch (error) {
        console.error('Error parsing booking data:', error);
        navigate('/search');
      }
    } else {
      navigate('/search');
    }
  }, [location.search, navigate]);

  const handlePaymentDetailChange = (field, value) => {
    setPaymentDetails({
      ...paymentDetails,
      [field]: value
    });
  };

  const validatePaymentDetails = () => {
    if (paymentMethod === 'card') {
      if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv || !paymentDetails.cardHolderName) {
        return false;
      }
      // Basic validation
      const cardNumberRegex = /^\d{16}$/;
      const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      const cvvRegex = /^\d{3}$/;

      return cardNumberRegex.test(paymentDetails.cardNumber) &&
             expiryRegex.test(paymentDetails.expiryDate) &&
             cvvRegex.test(paymentDetails.cvv);
    } else if (paymentMethod === 'upi') {
      return paymentDetails.upiId && paymentDetails.upiId.includes('@');
    }
    return false;
  };

  const handlePayment = async () => {
    if (!validatePaymentDetails()) {
      alert('Please fill in all payment details correctly');
      return;
    }

    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setPaymentSuccess(true);

      // After 2 seconds, redirect to confirmation page
      setTimeout(() => {
        navigate(`/booking-confirmation?bookingId=${Date.now()}&amount=${bookingData?.totalAmount}`);
      }, 2000);
    }, 3000);
  };

  const formatCardNumber = (value) => {
    // Remove spaces and limit to 16 digits
    const cleaned = value.replace(/\s+/g, '').replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
    return formatted.substring(0, 19); // 16 digits + 3 spaces
  };

  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  if (!bookingData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <span className="ml-3 text-lg">Loading booking details...</span>
        </div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">
            Your payment of ₹{bookingData.totalAmount} has been processed successfully.
          </p>
          <div className="animate-pulse text-green-600">
            Redirecting to booking confirmation...
          </div>
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
          Back to Seat Selection
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
            1
          </div>
          <span className="text-gray-600">Search</span>
          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
            2
          </div>
          <span className="text-gray-600">Seats</span>
          <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
            3
          </div>
          <span className="font-semibold text-primary-600">Payment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Bus:</span>
                <span className="font-medium">Bus ID: {bookingData.busId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{bookingData.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Seats:</span>
                <span className="font-medium">{bookingData.selectedSeats.length}</span>
              </div>

              <hr />

              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700">Selected Seats:</div>
                <div className="flex flex-wrap gap-1">
                  {bookingData.selectedSeats.map(seatKey => {
                    const [rowIndex, seatIndex] = seatKey.split('-');
                    const seat = bookingData.seatLayout?.[parseInt(rowIndex)]?.[parseInt(seatIndex)];
                    return seat ? (
                      <span key={seatKey} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {seat.seatNumber}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700">Passengers:</div>
                {bookingData.selectedSeats.map(seatKey => {
                  const passenger = bookingData.passengerDetails[seatKey];
                  const [rowIndex, seatIndex] = seatKey.split('-');
                  const seat = bookingData.seatLayout?.[parseInt(rowIndex)]?.[parseInt(seatIndex)];

                  return passenger ? (
                    <div key={seatKey} className="text-sm text-gray-600">
                      Seat {seat?.seatNumber}: {passenger.name} ({passenger.age}yo, {passenger.gender})
                    </div>
                  ) : null;
                })}
              </div>

              <hr />

              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount:</span>
                <span className="text-primary-600">₹{bookingData.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>

            {/* Payment Method Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Payment Method</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                    paymentMethod === 'card'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FiCreditCard className="w-6 h-6 text-primary-600" />
                    <div>
                      <div className="font-medium text-gray-900">Credit/Debit Card</div>
                      <div className="text-sm text-gray-600">Visa, MasterCard, RuPay</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                    paymentMethod === 'upi'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FiSmartphone className="w-6 h-6 text-primary-600" />
                    <div>
                      <div className="font-medium text-gray-900">UPI</div>
                      <div className="text-sm text-gray-600">Google Pay, PhonePe, Paytm</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Payment Form */}
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={paymentDetails.cardNumber}
                    onChange={(e) => handlePaymentDetailChange('cardNumber', formatCardNumber(e.target.value))}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={paymentDetails.expiryDate}
                      onChange={(e) => handlePaymentDetailChange('expiryDate', formatExpiryDate(e.target.value))}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="MM/YY"
                      maxLength="5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={paymentDetails.cvv}
                      onChange={(e) => handlePaymentDetailChange('cvv', e.target.value.replace(/\D/g, '').substring(0, 3))}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="123"
                      maxLength="3"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={paymentDetails.cardHolderName}
                    onChange={(e) => handlePaymentDetailChange('cardHolderName', e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  UPI ID
                </label>
                <input
                  type="text"
                  value={paymentDetails.upiId}
                  onChange={(e) => handlePaymentDetailChange('upiId', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="yourname@upi"
                />
              </div>
            )}

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-800">
                <FiShield className="w-5 h-5" />
                <span className="font-medium">Secure Payment</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Your payment information is encrypted and secure. We never store your card details.
              </p>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={processing || !validatePaymentDetails()}
              className={`w-full mt-8 py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
                processing || !validatePaymentDetails()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              }`}
            >
              {processing ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing Payment...
                </div>
              ) : (
                `Pay ₹${bookingData.totalAmount}`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
