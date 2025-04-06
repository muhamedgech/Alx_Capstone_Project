import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/buildings';

const initialState = {
  buildings: [],
  selectedBuilding: null,
  selectedFloor: null,
  selectedRoom: null,
  selectedProduct: null,
};

const toInteger = (id) => parseInt(id, 10);

// Async Actions

export const fetchBuildings = () => async (dispatch) => {
  try {
    const response = await axios.get(API_URL);
    dispatch(setBuildings(response.data));
  } catch (error) {
    console.error("Error fetching buildings:", error);
    alert("Failed to fetch buildings. Please check the server.");
  }
};

export const addBuildingAsync = (building) => async (dispatch) => {
  try {
    const response = await axios.post(API_URL, { ...building, floors: [] });
    dispatch(addBuilding(response.data));
  } catch (error) {
    console.error("Error adding building:", error);
    alert("Failed to add building.");
  }
};

export const updateBuildingAsync = (building) => async (dispatch) => {
  try {
    const existing = await axios.get(`${API_URL}/${building.id}`);
    const updated = { ...existing.data, name: building.name };
    const response = await axios.put(`${API_URL}/${building.id}`, updated);
    dispatch(editBuilding(response.data));
  } catch (error) {
    console.error("Error updating building:", error);
    alert("Failed to update building.");
  }
};

export const deleteBuildingAsync = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    dispatch(deleteBuilding({ id }));
  } catch (error) {
    console.error("Error deleting building:", error);
    alert("Failed to delete building.");
  }
};

export const addFloorAsync = (buildingId, floor) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/${buildingId}/floors`, { ...floor, rooms: [] });
    dispatch(addFloor({ buildingId, floor: response.data }));
  } catch (error) {
    console.error("Error adding floor:", error);
    alert("Failed to add floor.");
  }
};

export const updateFloorAsync = (buildingId, floor) => async (dispatch) => {
  try {
    const existing = await axios.get(`${API_URL}/${buildingId}`);
    const building = existing.data;
    const oldFloor = building.floors.find(f => f.id === floor.id);
    if (!oldFloor) throw new Error("Floor not found");

    const updatedFloor = { ...oldFloor, name: floor.name };
    const updatedFloors = building.floors.map(f => f.id === floor.id ? updatedFloor : f);
    const updatedBuilding = { ...building, floors: updatedFloors };

    const response = await axios.put(`${API_URL}/${buildingId}`, updatedBuilding);
    dispatch(editFloor({ buildingId, floor: updatedFloor }));
  } catch (error) {
    console.error("Error updating floor:", error);
    alert("Failed to update floor.");
  }
};

export const deleteFloorAsync = (buildingId, floorId) => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/${buildingId}`);
    const updated = {
      ...res.data,
      floors: res.data.floors.filter(f => f.id !== floorId),
    };
    await axios.put(`${API_URL}/${buildingId}`, updated);
    dispatch(deleteFloor({ buildingId, floorId }));
  } catch (error) {
    console.error("Error deleting floor:", error);
    alert("Failed to delete floor.");
  }
};

export const addRoomAsync = (buildingId, floorId, room) => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/${buildingId}`);
    const building = res.data;
    const updatedFloors = building.floors.map(floor =>
      floor.id === floorId
        ? { ...floor, rooms: [...(floor.rooms || []), { ...room, products: [] }] }
        : floor
    );
    const updated = { ...building, floors: updatedFloors };
    await axios.put(`${API_URL}/${buildingId}`, updated);
    dispatch(addRoom({ floorId, room: { ...room, products: [] } }));
  } catch (error) {
    console.error("Error adding room:", error);
    alert("Failed to add room.");
  }
};

export const updateRoomAsync = (buildingId, floorId, room) => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/${buildingId}`);
    const building = res.data;
    const updatedFloors = building.floors.map(floor => {
      if (floor.id !== floorId) return floor;
      const updatedRooms = floor.rooms.map(r =>
        r.id === room.id ? { ...r, name: room.name } : r
      );
      return { ...floor, rooms: updatedRooms };
    });
    const updated = { ...building, floors: updatedFloors };
    await axios.put(`${API_URL}/${buildingId}`, updated);
    dispatch(editRoom({ floorId, room }));
  } catch (error) {
    console.error("Error updating room:", error);
    alert("Failed to update room.");
  }
};

export const deleteRoomAsync = (buildingId, floorId, roomId) => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/${buildingId}`);
    const building = res.data;
    const updatedFloors = building.floors.map(floor =>
      floor.id === floorId
        ? { ...floor, rooms: floor.rooms.filter(r => r.id !== roomId) }
        : floor
    );
    const updated = { ...building, floors: updatedFloors };
    await axios.put(`${API_URL}/${buildingId}`, updated);
    dispatch(deleteRoom({ floorId, roomId }));
  } catch (error) {
    console.error("Error deleting room:", error);
    alert("Failed to delete room.");
  }
};

export const addProductAsync = (buildingId, floorId, roomId, product) => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/${buildingId}`);
    const building = res.data;
    const updatedFloors = building.floors.map(floor => {
      if (floor.id !== floorId) return floor;
      const updatedRooms = floor.rooms.map(room =>
        room.id === roomId
          ? { ...room, products: [...(room.products || []), product] }
          : room
      );
      return { ...floor, rooms: updatedRooms };
    });
    const updated = { ...building, floors: updatedFloors };
    await axios.put(`${API_URL}/${buildingId}`, updated);
    dispatch(addProduct({ floorId, roomId, product }));
  } catch (error) {
    console.error("Error adding product:", error);
    alert("Failed to add product.");
  }
};

export const updateProductAsync = (buildingId, floorId, roomId, product) => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/${buildingId}`);
    const building = res.data;
    const updatedFloors = building.floors.map(floor => {
      if (floor.id !== floorId) return floor;
      const updatedRooms = floor.rooms.map(room => {
        if (room.id !== roomId) return room;
        const updatedProducts = room.products.map(p =>
          p.id === product.id ? product : p
        );
        return { ...room, products: updatedProducts };
      });
      return { ...floor, rooms: updatedRooms };
    });
    const updated = { ...building, floors: updatedFloors };
    await axios.put(`${API_URL}/${buildingId}`, updated);
    dispatch(editProduct({ floorId, roomId, product }));
  } catch (error) {
    console.error("Error updating product:", error);
    alert("Failed to update product.");
  }
};

export const deleteProductAsync = (buildingId, floorId, roomId, productId) => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/${buildingId}`);
    const building = res.data;
    const updatedFloors = building.floors.map(floor => {
      if (floor.id !== floorId) return floor;
      const updatedRooms = floor.rooms.map(room =>
        room.id === roomId
          ? { ...room, products: room.products.filter(p => p.id !== productId) }
          : room
      );
      return { ...floor, rooms: updatedRooms };
    });
    const updated = { ...building, floors: updatedFloors };
    await axios.put(`${API_URL}/${buildingId}`, updated);
    dispatch(deleteProduct({ floorId, roomId, productId }));
  } catch (error) {
    console.error("Error deleting product:", error);
    alert("Failed to delete product.");
  }
};

// Reducer & Slice

const buildingSlice = createSlice({
  name: 'building',
  initialState,
  reducers: {
    setBuildings(state, action) {
      state.buildings = (action.payload || []).map(building => ({
        ...building,
        id: building.id,
        floors: (building.floors || []).map(floor => ({
          ...floor,
          id: floor.id,
          rooms: (floor.rooms || []).map(room => ({
            ...room,
            id: room.id,
            products: (room.products || []).map(product => ({
              ...product,
              id: product.id,
            })),
          })),
        })),
      }));
    },
    addBuilding(state, action) {
      state.buildings.push({ ...action.payload, id: toInteger(action.payload.id), floors: [] });
    },
    addFloor(state, action) {
      const building = state.buildings.find(b => toInteger(b.id) === toInteger(action.payload.buildingId));
      if (building) {
        building.floors.push({ ...action.payload.floor, id: toInteger(action.payload.floor.id), rooms: [] });
      }
    },
    addRoom(state, action) {
      const floor = state.buildings.flatMap(b => b.floors).find(f => toInteger(f.id) === toInteger(action.payload.floorId));
      if (floor) {
        floor.rooms.push({ ...action.payload.room, id: toInteger(action.payload.room.id), products: [] });
      }
    },
    addProduct(state, action) {
      const floor = state.buildings.flatMap(b => b.floors).find(f => toInteger(f.id) === toInteger(action.payload.floorId));
      if (floor) {
        const room = floor.rooms.find(r => toInteger(r.id) === toInteger(action.payload.roomId));
        if (room) {
          room.products.push({ ...action.payload.product, id: toInteger(action.payload.product.id) });
        }
      }
    },
    editBuilding(state, action) {
      const building = state.buildings.find(b => toInteger(b.id) === toInteger(action.payload.id));
      if (building) {
        building.name = action.payload.name;
      }
    },
    editFloor(state, action) {
      const building = state.buildings.find(b => toInteger(b.id) === toInteger(action.payload.buildingId));
      if (building) {
        const updatedFloors = building.floors.map(floor => 
          floor.id === toInteger(action.payload.floor.id)
            ? { ...floor, name: action.payload.floor.name }
            : floor
        );
        building.floors = updatedFloors;
      }
    },
    editRoom(state, action) {
      const building = state.buildings.find(b => toInteger(b.id) === toInteger(action.payload.buildingId));
      if (building) {
        const updatedFloors = building.floors.map(floor => {
          if (floor.id !== toInteger(action.payload.floorId)) return floor;
          const updatedRooms = floor.rooms.map(room => 
            room.id === toInteger(action.payload.room.id)
              ? { ...room, name: action.payload.room.name }
              : room
          );
          return { ...floor, rooms: updatedRooms };
        });
        building.floors = updatedFloors;
      }
    },
    editProduct(state, action) {
      const building = state.buildings.find(b => toInteger(b.id) === toInteger(action.payload.buildingId));
      if (building) {
        const updatedFloors = building.floors.map(floor => {
          if (floor.id !== toInteger(action.payload.floorId)) return floor;
          const updatedRooms = floor.rooms.map(room => {
            if (room.id !== toInteger(action.payload.roomId)) return room;
            const updatedProducts = room.products.map(p =>
              p.id === toInteger(action.payload.product.id)
                ? { ...p, name: action.payload.product.name, otherProperty: action.payload.product.otherProperty }
                : p
            );
            return { ...room, products: updatedProducts };
          });
          return { ...floor, rooms: updatedRooms };
        });
        building.floors = updatedFloors;
      }
    },
    deleteBuilding(state, action) {
      state.buildings = state.buildings.filter(b => toInteger(b.id) !== toInteger(action.payload.id));
    },
    deleteFloor(state, action) {
      const building = state.buildings.find(b => toInteger(b.id) === toInteger(action.payload.buildingId));
      if (building) {
        building.floors = building.floors.filter(f => toInteger(f.id) !== toInteger(action.payload.floorId));
      }
    },
    deleteRoom(state, action) {
      const floor = state.buildings.flatMap(b => b.floors).find(f => toInteger(f.id) === toInteger(action.payload.floorId));
      if (floor) {
        floor.rooms = floor.rooms.filter(r => toInteger(r.id) !== toInteger(action.payload.roomId));
      }
    },
    deleteProduct(state, action) {
      const floor = state.buildings.flatMap(b => b.floors).find(f => toInteger(f.id) === toInteger(action.payload.floorId));
      if (floor) {
        const room = floor.rooms.find(r => toInteger(r.id) === toInteger(action.payload.roomId));
        if (room) {
          room.products = room.products.filter(p => toInteger(p.id) !== toInteger(action.payload.productId));
        }
      }
    },
    selectBuilding(state, action) {
      state.selectedBuilding = action.payload;
      state.selectedFloor = null;
      state.selectedRoom = null;
      state.selectedProduct = null;
    },
    selectFloor(state, action) {
      state.selectedFloor = action.payload;
      state.selectedRoom = null;
      state.selectedProduct = null;
    },
    selectRoom(state, action) {
      state.selectedRoom = action.payload;
      state.selectedProduct = null;
    },
    selectProduct(state, action) {
      state.selectedProduct = action.payload;
    },
  },
});

export const {
  setBuildings,
  addBuilding,
  addFloor,
  addRoom,
  addProduct,
  editBuilding,
  editFloor,
  editRoom,
  editProduct,
  deleteBuilding,
  deleteFloor,
  deleteRoom,
  deleteProduct,
  selectBuilding,
  selectFloor,
  selectRoom,
  selectProduct,
} = buildingSlice.actions;

export default buildingSlice.reducer;
