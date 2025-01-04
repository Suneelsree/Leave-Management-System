// dashboardSlice.js
import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    student: null, // Object to store student data
  },
  reducers: {
    setStudentData: (state, action) => {
      state.student = action.payload;
    },
  },
});

export const { setStudentData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
