import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setBuildings, selectBuilding, selectFloor, selectRoom } from '../redux/buildingSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { buildings, selectedBuilding, selectedFloor, selectedRoom } = useSelector(state => state.building);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuildingsData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/buildings');
        dispatch(setBuildings(response.data));
        console.log(response.data);  // Log the buildings data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBuildingsData();
  }, [dispatch]);

  // Handle building change
  const handleBuildingChange = (buildingId) => {
    const building = buildings.find(b => parseInt(b.id) === parseInt(buildingId)); // Convert to int
    if (building) {
      dispatch(selectBuilding(building));
      dispatch(selectFloor(null));  // Reset floor selection
      dispatch(selectRoom(null));   // Reset room selection
    }
  };

  // Handle floor change
  const handleFloorChange = (floorId) => {
    if (selectedBuilding && selectedBuilding.floors) {
      const floor = selectedBuilding.floors.find(f => f.id === parseInt(floorId)); // Convert to int
      if (floor) {
        dispatch(selectFloor(floor));
        dispatch(selectRoom(null));   // Reset room selection
      }
    }
  };

  // Handle room change
  const handleRoomChange = (roomId) => {
    if (selectedFloor && selectedFloor.rooms) {
      const room = selectedFloor.rooms.find(r => r.id === parseInt(roomId)); // Convert to int
      if (room) {
        dispatch(selectRoom(room));  // Set selected room
      }
    }
  };

  if (loading) {
    return <div>Loading buildings...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col md:flex-row md:pt-16">
      {/* Sidebar for small screens (visible below header) */}
      <div className="md:hidden block w-full bg-indigo-100 p-4 space-y-6 z-50 sm:relative">
        <h2 className="text-lg font-semibold mb-4">Select Building, Floor, and Room</h2>

        <div className="flex flex-col space-y-4">
          {/* Building Dropdown */}
          <div className="mb-1">
            <label className="block">Building</label>
            <select
              className="w-full p-2 bg-gray-700 rounded-lg"
              value={selectedBuilding ? selectedBuilding.id : ''}
              onChange={(e) => handleBuildingChange(e.target.value)}
            >
              <option value="">Select Building</option>
              {Array.isArray(buildings) && buildings.length > 0 ? (
                buildings.map((building) => (
                  <option key={building.id} value={building.id}>{building.name}</option>
                ))
              ) : (
                <option value="">No Buildings Available</option>
              )}
            </select>
          </div>

          {/* Floor Dropdown */}
          {selectedBuilding && selectedBuilding.floors && selectedBuilding.floors.length > 0 && (
            <div className="mb-4">
              <label className="block">Floor</label>
              <select
                className="w-full p-2 bg-gray-700 rounded-lg"
                value={selectedFloor ? selectedFloor.id : ''}
                onChange={(e) => handleFloorChange(e.target.value)}
              >
                <option value="">Select Floor</option>
                {Array.isArray(selectedBuilding.floors) && selectedBuilding.floors.length > 0 ? (
                  selectedBuilding.floors.map((floor) => (
                    <option key={floor.id} value={floor.id}>{floor.name}</option>
                  ))
                ) : (
                  <option value="">No Floors Available</option>
                )}
              </select>
            </div>
          )}

          {/* Room Dropdown */}
          {selectedFloor && selectedFloor.rooms && selectedFloor.rooms.length > 0 && (
            <div className="mb-4">
              <label className="block">Room</label>
              <select
                className="w-full p-2 bg-gray-700 rounded-lg"
                value={selectedRoom ? selectedRoom.id : ''}
                onChange={(e) => handleRoomChange(e.target.value)}
              >
                <option value="">Select Room</option>
                {Array.isArray(selectedFloor.rooms) && selectedFloor.rooms.length > 0 ? (
                  selectedFloor.rooms.map((room) => (
                    <option key={room.id} value={room.id}>{room.name}</option>
                  ))
                ) : (
                  <option value="">No Rooms Available</option>
                )}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar for larger screens (hidden on small screens) */}
      <div className="md:block hidden w-72 bg-indigo-100 p-4 space-y-6">
        <h2 className="text-lg font-semibold mb-4">Select Building, Floor, and Room</h2>

        {/* Building Dropdown */}
        <div className="mb-1">
          <label className="block">Building</label>
          <select
            className="w-full p-2 bg-gray-700 rounded-lg"
            value={selectedBuilding ? selectedBuilding.id : ''}
            onChange={(e) => handleBuildingChange(e.target.value)}
          >
            <option value="">Select Building</option>
            {Array.isArray(buildings) && buildings.length > 0 ? (
              buildings.map((building) => (
                <option key={building.id} value={building.id}>{building.name}</option>
              ))
            ) : (
              <option value="">No Buildings Available</option>
            )}
          </select>
        </div>

        {/* Floor Dropdown */}
        {selectedBuilding && selectedBuilding.floors && selectedBuilding.floors.length > 0 && (
          <div className="mb-4">
            <label className="block">Floor</label>
            <select
              className="w-full p-2 bg-gray-700 rounded-lg"
              value={selectedFloor ? selectedFloor.id : ''}
              onChange={(e) => handleFloorChange(e.target.value)}
            >
              <option value="">Select Floor</option>
              {Array.isArray(selectedBuilding.floors) && selectedBuilding.floors.length > 0 ? (
                selectedBuilding.floors.map((floor) => (
                  <option key={floor.id} value={floor.id}>{floor.name}</option>
                ))
              ) : (
                <option value="">No Floors Available</option>
              )}
            </select>
          </div>
        )}

        {/* Room Dropdown */}
        {selectedFloor && selectedFloor.rooms && selectedFloor.rooms.length > 0 && (
          <div className="mb-4">
            <label className="block">Room</label>
            <select
              className="w-full p-2 bg-gray-700 rounded-lg"
              value={selectedRoom ? selectedRoom.id : ''}
              onChange={(e) => handleRoomChange(e.target.value)}
            >
              <option value="">Select Room</option>
              {Array.isArray(selectedFloor.rooms) && selectedFloor.rooms.length > 0 ? (
                selectedFloor.rooms.map((room) => (
                  <option key={room.id} value={room.id}>{room.name}</option>
                ))
              ) : (
                <option value="">No Rooms Available</option>
              )}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
