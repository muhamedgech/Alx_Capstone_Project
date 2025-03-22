import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBuildings, selectBuilding, selectFloor, selectRoom } from '../redux/buildingSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { buildings, selectedBuilding, selectedFloor, selectedRoom } = useSelector(state => state.building);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch buildings from the mock server
    const fetchBuildingsData = async () => {
      try {
        const response = await fetch('http://localhost:5000/buildings');
        if (!response.ok) {
          throw new Error('Failed to fetch buildings');
        }
        const data = await response.json();
        dispatch(setBuildings(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBuildingsData();
  }, [dispatch]);

  const handleBuildingChange = (buildingId) => {
    const building = buildings.find(b => b.id === buildingId);
    dispatch(selectBuilding(building));
    dispatch(selectFloor(null));  // Reset floor and room selections
    dispatch(selectRoom(null));
  };

  const handleFloorChange = (floorId) => {
    const floor = selectedBuilding.floors.find(f => f.id === floorId);
    dispatch(selectFloor(floor));
    dispatch(selectRoom(null));  // Reset room selection
  };

  const handleRoomChange = (roomId) => {
    const room = selectedFloor.rooms.find(r => r.id === roomId);
    dispatch(selectRoom(room));
  };

  if (loading) {
    return <div>Loading buildings...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-lg font-semibold mb-4">Select Building, Floor, and Room</h2>
      
      {/* Building Dropdown */}
      <div className="mb-4">
        <label className="block">Building</label>
        <select
          className="w-full p-2 bg-gray-700"
          value={selectedBuilding ? selectedBuilding.id : ''}
          onChange={(e) => handleBuildingChange(e.target.value)}
        >
          <option value="">Select Building</option>
          {buildings.map((building) => (
            <option key={building.id} value={building.id}>{building.name}</option>
          ))}
        </select>
      </div>

      {/* Floor Dropdown */}
      {selectedBuilding && (
        <div className="mb-4">
          <label className="block">Floor</label>
          <select
            className="w-full p-2 bg-gray-700"
            value={selectedFloor ? selectedFloor.id : ''}
            onChange={(e) => handleFloorChange(e.target.value)}
          >
            <option value="">Select Floor</option>
            {selectedBuilding.floors.map((floor) => (
              <option key={floor.id} value={floor.id}>{floor.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Room Dropdown */}
      {selectedFloor && (
        <div className="mb-4">
          <label className="block">Room</label>
          <select
            className="w-full p-2 bg-gray-700"
            value={selectedRoom ? selectedRoom.id : ''}
            onChange={(e) => handleRoomChange(e.target.value)}
          >
            <option value="">Select Room</option>
            {selectedFloor.rooms.map((room) => (
              <option key={room.id} value={room.id}>{room.name}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
