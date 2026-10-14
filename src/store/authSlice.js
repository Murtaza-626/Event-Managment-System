import { createSlice } from "@reduxjs/toolkit";

// Loading active user from local storage if available for persistence
const storedUser = JSON.parse(localStorage.getItem("activeUser")) || null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser, // Holds the currently logged-in user
  },
  reducers: {
    register: (state, action) => {
      const newUser = action.payload;
      
      // Get existing users from local storage
      const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
      
      // Save new user to the list and set as currently active
      localStorage.setItem("registeredUsers", JSON.stringify([...users, newUser]));
      localStorage.setItem("activeUser", JSON.stringify(newUser));
      
      state.user = newUser;
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
      
      // Find matching user
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        localStorage.setItem("activeUser", JSON.stringify(foundUser));
        state.user = foundUser;
      } else {
        alert("Invalid email or password!");
      }
    },
    logout: (state) => {
      localStorage.removeItem("activeUser");
      state.user = null;
    }
  }
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;