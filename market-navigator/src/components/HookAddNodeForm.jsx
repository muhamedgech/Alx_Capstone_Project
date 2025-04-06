import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addBuilding,
  addFloor,
  addRoom,
  addProduct,
  editBuilding,
  editFloor,
  editRoom,
  editProduct,
} from "../redux/buildingSlice";

const Modal = ({ modalData, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    ...modalData, // Dynamically populate other fields if needed
  });

  useEffect(() => {
    // Update formData whenever modalData changes
    setFormData({ name: modalData.name || "", ...modalData });
  }, [modalData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { action, type, buildingId, floorId, roomId, id } = modalData;
  
    console.log("Submitting", { action, type, buildingId, floorId, roomId, id });
  
    // Handle Add Actions
    if (action === "Add") {
      if (type === "Building") {
        dispatch(addBuilding({ id: Date.now(), name: formData.name, floors: [] }));
      } else if (type === "Floor") {
        dispatch(addFloor({
          buildingId,
          floor: { id: Date.now(), name: formData.name, rooms: [] }
        }));
      } else if (type === "Room") {
        dispatch(addRoom({
          floorId,
          room: { id: Date.now(), name: formData.name, products: [] }
        }));
      } else if (type === "Product") {
        dispatch(addProduct({
          floorId,
          roomId,
          product: { id: Date.now(), name: formData.name }
        }));
      }
    }
    // Handle Edit Actions
    else if (action === "Edit") {
      if (type === "Building") {
        dispatch(editBuilding({ id, name: formData.name }));
      } else if (type === "Floor") {
        dispatch(editFloor({ buildingId, floorId: id, name: formData.name }));
      } else if (type === "Room") {
        dispatch(editRoom({ floorId, roomId: id, name: formData.name }));
      } else if (type === "Product") {
        dispatch(editProduct({ floorId, roomId, productId: id, name: formData.name }));
      }
    }
  
    onClose(); // Close modal after submission
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">
          {modalData.action} {modalData.type}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          {/* Additional fields can be added dynamically here for different types */}
          
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-4 bg-gray-400 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
