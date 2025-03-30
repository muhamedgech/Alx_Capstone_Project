import React from "react";

const Marketview = ({ selectedRoom }) => {
  return (
    <div className="flex-1 p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
        🛒 Marketplace Navigator
      </h1>

      {selectedRoom ? (
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
            Products in <span className="text-blue-500">{selectedRoom.name}</span>
          </h2>
          {selectedRoom.products?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {selectedRoom.products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 border border-gray-200"
                >
                  <h3 className="font-semibold text-xl mb-2 text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{product.description}</p>

                  {/* Price Badge */}
                  <div className="mb-4">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      ${product.price}
                    </span>
                  </div>

                  {/* Availability Status */}
                  <p
                    className={`text-sm font-semibold ${
                      product.available ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {product.available ? "✔ In Stock" : "✖ Out of Stock"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No products available in this room.</p>
          )}
        </div>
      ) : (
        <p className="text-lg text-gray-600 text-center">
          Please select a room to view products.
        </p>
      )}
    </div>
  );
};

export default Marketview;
