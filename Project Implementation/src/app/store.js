// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';  // Import userReducer
import leaveReducer from '../features/leaveSlice'; // Import leaveReducer
import dashboardReducer from '../features/dashboardSlice'; // Import new dashboardReducer

const store = configureStore({
  reducer: {
    user: userReducer,
    leave: leaveReducer,
    dashboard: dashboardReducer, // Use the new dashboardReducer
  },
});

export default store;
