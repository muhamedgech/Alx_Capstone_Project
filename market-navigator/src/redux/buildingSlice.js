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
    setBuildings: (state, action) => {
      state.buildings = action.payload;
    },
    selectBuilding: (state, action) => {
      state.selectedBuilding = action.payload;
    },
    selectFloor: (state, action) => {
      state.selectedFloor = action.payload;
    },
    selectRoom: (state, action) => {
      state.selectedRoom = action.payload;
    },
  },
});

export const { setBuildings, selectBuilding, selectFloor, selectRoom } = buildingSlice.actions;
export default buildingSlice.reducer;
