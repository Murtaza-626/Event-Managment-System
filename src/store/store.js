import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../authSlice";
import eventsReducer from "../eventsSlice"; // Import events reducer

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer, // Register events slice
  },
});