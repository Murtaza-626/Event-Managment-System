import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    setEvents: (state, action) => {
      // Updating array state from action.payload
      state.list = action.payload; 
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setEvents, setLoading } = eventsSlice.actions;
export default eventsSlice.reducer;