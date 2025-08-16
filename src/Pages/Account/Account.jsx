const Account = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">My Account</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
          <form className="gap-2 md:gap-3 lg:gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+1 234 567 890"
              />
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
              Save Changes
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Order History</h3>
          <div className="gap-2 md:gap-3 lg:gap-4">
            <div className="border-b pb-4">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Order #12345</span>
                <span className="text-gray-600">$299.99</span>
              </div>
              <p className="text-gray-600">Placed on January 1, 2024</p>
              <p className="text-green-600">Delivered</p>
            </div>
            <div className="border-b pb-4">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Order #12346</span>
                <span className="text-gray-600">$199.99</span>
              </div>
              <p className="text-gray-600">Placed on December 15, 2023</p>
              <p className="text-green-600">Delivered</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account; 