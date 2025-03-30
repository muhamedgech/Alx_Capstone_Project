import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  buildings: [],
  selectedBuilding: null,
  selectedFloor: null,
  selectedRoom: null,
};

const buildingSlice = createSlice({
  name: 'building',
  initialState,
  reducers: {
    // Action to set the buildings data
    setBuildings(state, action) {
      state.buildings = action.payload;
    },
    
    // Action to select a building
    selectBuilding(state, action) {
      state.selectedBuilding = action.payload;
      state.selectedFloor = null;  // Reset floor selection when a new building is selected
      state.selectedRoom = null;   // Reset room selection when a new building is selected
    },
    
    // Action to select a floor
    selectFloor(state, action) {
      state.selectedFloor = action.payload;
      state.selectedRoom = null;  // Reset room selection when a new floor is selected
    },
    
    // Action to select a room
    selectRoom(state, action) {
      state.selectedRoom = action.payload;
    },
  },
});

export const { setBuildings, selectBuilding, selectFloor, selectRoom } = buildingSlice.actions;

export default buildingSlice.reducer;