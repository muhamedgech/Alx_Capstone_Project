import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addBuildingAsync,
  addFloorAsync, // New async thunk
  addRoomAsync,   // New async thunk
  addProductAsync, // New async thunk
  deleteBuildingAsync,
  deleteFloorAsync, // New async thunk
  deleteRoomAsync,  // New async thunk
  deleteProductAsync, // New async thunk
  fetchBuildings,
  updateBuildingAsync,
  updateFloorAsync, // New async thunk
  updateRoomAsync,  // New async thunk
  updateProductAsync, // New async thunk
} from "../redux/buildingSlice";
import Modal from "./HookAddNodeForm";

const AdminPage = () => {
  const dispatch = useDispatch();
  const { buildings } = useSelector((state) => state.building);
  const [expanded, setExpanded] = useState({});
  const [modalData, setModalData] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    dispatch(fetchBuildings());
  }, [dispatch]);

  const toggleExpand = (id, level) => {
    setExpanded((prev) => ({ ...prev, [`${level}-${id}`]: !prev[`${level}-${id}`] }));
  };

  const openModal = (action, type, data = {}) => {
    setModalData({ action, type, ...data });
  };

  const closeModal = () => setModalData(null);

  // Updated handler functions to use async thunks
  const handleAddBuilding = (building) => {
    dispatch(addBuildingAsync(building));
  };

  const handleEditBuilding = (building) => {
    dispatch(updateBuildingAsync(building));
  };

  const handleDeleteBuilding = (id) => {
    dispatch(deleteBuildingAsync(id));
  };

  const handleAddFloor = (buildingId, floor) => {
    dispatch(addFloorAsync(buildingId, floor));
  };

  const handleEditFloor = (buildingId, floor) => {
    dispatch(updateFloorAsync(buildingId, floor));
  };

  const handleDeleteFloor = (buildingId, floorId) => {
    dispatch(deleteFloorAsync(buildingId, floorId));
  };

  const handleAddRoom = (buildingId, floorId, room) => {
    dispatch(addRoomAsync(buildingId, floorId, room));
  };

  const handleEditRoom = (buildingId, floorId, room) => {
    dispatch(updateRoomAsync(buildingId, floorId, room));
  };

  const handleDeleteRoom = (buildingId, floorId, roomId) => {
    dispatch(deleteRoomAsync(buildingId, floorId, roomId));
  };

  const handleAddProduct = (buildingId, floorId, roomId, product) => {
    dispatch(addProductAsync(buildingId, floorId, roomId, product));
  };

  const handleEditProduct = (buildingId, floorId, roomId, product) => {
    dispatch(updateProductAsync(buildingId, floorId, roomId, product));
  };

  const handleDeleteProduct = (buildingId, floorId, roomId, productId) => {
    dispatch(deleteProductAsync(buildingId, floorId, roomId, productId));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-12 px-6">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mt-8 space-y-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800">Admin Dashboard</h1>

        <ul className="space-y-4">
          {buildings.map((building) => (
            <li
              key={building.id}
              className="group bg-gray-100 hover:bg-gray-200 rounded-lg p-4"
              onMouseEnter={() => setHoveredItem(`building-${building.id}`)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="flex justify-between items-center">
                <span
                  onClick={() => toggleExpand(building.id, "building")}
                  className="text-lg font-medium text-gray-700 cursor-pointer"
                >
                  {expanded[`building-${building.id}`] ? "▼" : "▶"} {building.name}
                </span>
                {hoveredItem === `building-${building.id}` && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openModal("Edit", "Building", { id: building.id, name: building.name })}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteBuilding(building.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      🗑️
                    </button>
                    <button
                      onClick={() => openModal("Add", "Floor", { buildingId: building.id })}
                      className="text-green-500 hover:text-green-700"
                    >
                      ➕
                    </button>
                  </div>
                )}
              </div>

              {expanded[`building-${building.id}`] && (
                <ul className="mt-4 space-y-2 ml-4">
                  {building.floors?.map((floor) => (
                    <li
                      key={floor.id}
                      className="group bg-gray-50 hover:bg-gray-100 rounded-lg p-3"
                      onMouseEnter={() => setHoveredItem(`floor-${floor.id}-${building.id}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className="flex justify-between items-center">
                        <span
                          onClick={() => toggleExpand(floor.id, "floor")}
                          className="text-md font-medium text-gray-700 cursor-pointer"
                        >
                          {expanded[`floor-${floor.id}`] ? "▼" : "▶"} {floor.name}
                        </span>
                        {hoveredItem === `floor-${floor.id}-${building.id}` && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                openModal("Edit", "Floor", {
                                  buildingId: building.id,
                                  id: floor.id,
                                  name: floor.name,
                                })
                              }
                              className="text-blue-500 hover:text-blue-700"
                            >
                              ✏️
                            </button>
                                          <button
                onClick={() => handleDeleteProduct(building.id, floor.id, room.id, product.id)}
                className="text-red-500 hover:text-red-700"
              >
                🗑️
              </button>
                            <button
                              onClick={() => openModal("Add", "Room", { buildingId: building.id, floorId: floor.id })}
                              className="text-green-500 hover:text-green-700"
                            >
                              ➕
                            </button>
                          </div>
                        )}
                      </div>

                      {expanded[`floor-${floor.id}`] && (
                        <ul className="space-y-2 ml-4">
                          {floor.rooms?.map((room) => (
                            <li
                              key={room.id}
                              className="group bg-gray-50 hover:bg-gray-100 rounded-lg p-3"
                              onMouseEnter={() => setHoveredItem(`room-${room.id}-${floor.id}-${building.id}`)}
                              onMouseLeave={() => setHoveredItem(null)}
                            >
                              <div className="flex justify-between items-center">
                                <span
                                  onClick={() => toggleExpand(room.id, "room")}
                                  className="text-sm text-gray-700 cursor-pointer"
                                >
                                  {expanded[`room-${room.id}`] ? "▼" : "▶"} {room.name}
                                </span>
                                {hoveredItem === `room-${room.id}-${floor.id}-${building.id}` && (
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() =>
                                        openModal("Edit", "Room", {
                                          buildingId: building.id,
                                          floorId: floor.id,
                                          id: room.id,
                                          name: room.name,
                                        })
                                      }
                                      className="text-blue-500 hover:text-blue-700"
                                    >
                                      ✏️
                                    </button>
                                    <button
                                      onClick={() => handleDeleteRoom(building.id, floor.id, room.id)}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      🗑️
                                    </button>
                                    <button
                                      onClick={() =>
                                        openModal("Add", "Product", { buildingId: building.id, floorId: floor.id, roomId: room.id })
                                      }
                                      className="text-green-500 hover:text-green-700"
                                    >
                                      ➕
                                    </button>
                                  </div>
                                )}
                              </div>

                              {expanded[`room-${room.id}`] && (
                                <ul className="space-y-2 ml-4">
                                  {room.products?.map((product) => (
                                    <li
                                      key={product.id}
                                      className="group bg-gray-50 hover:bg-gray-100 rounded-lg p-3"
                                      onMouseEnter={() => setHoveredItem(`product-${product.id}-${room.id}-${floor.id}-${building.id}`)}
                                      onMouseLeave={() => setHoveredItem(null)}
                                    >
                                      <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-700">{product.name}</span>
                                        {hoveredItem === `product-${product.id}-${room.id}-${floor.id}-${building.id}` && (
                                          <div className="flex space-x-2">
                                            <button
                                              onClick={() =>
                                                openModal("Edit", "Product", {
                                                  buildingId: building.id,
                                                  floorId: floor.id,
                                                  roomId: room.id,
                                                  id: product.id,
                                                  name: product.name,
                                                })
                                              }
                                              className="text-blue-500 hover:text-blue-700"
                                            >
                                              ✏️
                                            </button>
                                            <button
                                              onClick={() => handleDeleteProduct(building.id, floorId, room.id, product.id)}
                                              className="text-red-500 hover:text-red-700"
                                            >
                                              🗑️
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {modalData && <Modal modalData={modalData} onClose={closeModal} />}
      </div>
    </div>
  );
};

export default AdminPage;