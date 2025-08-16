import React from 'react';

const Deals = () => {
  return (
    <div className="w-full space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Today's Deals
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Don't miss out on these amazing limited-time offers
        </p>
      </div>

      {/* Coming Soon */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-12 text-white text-center">
        <div className="text-6xl mb-6">🔥</div>
        <h2 className="text-3xl font-bold mb-4">Amazing Deals Coming Soon!</h2>
        <p className="text-orange-100 text-lg mb-8">
          We're preparing incredible deals and discounts for you. 
          Stay tuned for flash sales, daily deals, and exclusive offers.
        </p>
        <button className="bg-white text-orange-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
          Notify Me
        </button>
      </div>
    </div>
  );
};

export default Deals;
