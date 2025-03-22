import React from "react";

const Marketview = ({ selectedRoom }) => {
  return (
    <div className="flex-1 p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Marketplace Navigator</h1>

      {selectedRoom ? (
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Products in {selectedRoom.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {selectedRoom.products.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-gray-800 font-semibold mb-4">Price: ${product.price}</p>
                <p className={`text-sm ${product.available ? 'text-green-500' : 'text-red-500'}`}>
                  {product.available ? 'Available' : 'Out of Stock'}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-lg text-gray-600">Please select a room to view products.</p>
      )}
    </div>
  );
};

export default Marketview;
