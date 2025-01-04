import { createSlice } from '@reduxjs/toolkit';

const defaultUsers = [
  {
    id: 1, // Unique identifier for the first default user
    fullname: 'Suneel',
    email: 'Suneel44@gmail.com',
    year: 'IV',
    department: 'Computer Science',
    studentId: '21cs44',
    collegename: 'GCE',
    phoneno: '9363393330',
    password:'Suneel44',
  },
  {
    id: 2,
    fullname: 'Rethik',
    email: 'Rethik22@gmail.com',
    year: 'II',
    department: 'Bio Tech',
    studentId: '22BT22',
    collegename: 'GCE',
    phoneno: '7205959452',
    password:'Rethik22',
  },
];

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: defaultUsers,
    loginError: '',
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    loginUser: (state, action) => {
      // Existing login logic can be handled here
    },
  },
});

export const { addUser, updateUser, deleteUser, loginUser } = userSlice.actions;
export default userSlice.reducer;
