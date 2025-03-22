import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './components/Sidebar';

function App() {
  const { selectedRoom } = useSelector(state => state.building);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4">
        <h1 className="text-3xl font-bold mb-4">Marketplace Navigator</h1>

        {selectedRoom ? (
          <div>
            <h2 className="text-xl">Products in {selectedRoom.name}</h2>
            <ul className="mt-4">
              {selectedRoom.products.map((product) => (
                <li key={product.id} className="border-b py-2">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p>{product.description}</p>
                  <p className="text-gray-600">Price: ${product.price}</p>
                  <p className={product.available ? 'text-green-500' : 'text-red-500'}>
                    {product.available ? 'Available' : 'Out of Stock'}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-lg">Please select a room to view products.</p>
        )}
      </div>
    </div>
  );
}

export default App;
