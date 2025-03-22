// src/store/store.js

import { configureStore } from '@reduxjs/toolkit';
import buildingReducer from './buildingSlice';

const store = configureStore({
  reducer: {
    building: buildingReducer,
  },
});

export default store;
