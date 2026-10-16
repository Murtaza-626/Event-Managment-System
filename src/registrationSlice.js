import { createSlice } from "@reduxjs/toolkit";

// Loading from local storage to persist registrations 
const storedRegistrations = JSON.parse(localStorage.getItem("eventRegistrations")) || [];

const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    list: storedRegistrations,
  },
  reducers: {
    registerEvent: (state, action) => {
      // Lecture Slide 102: Merging new data to state array
      state.list = [...state.list, action.payload];
      localStorage.setItem("eventRegistrations", JSON.stringify(state.list));
    },
    cancelRegistration: (state, action) => {
      // Deleting item using filter
      state.list = state.list.filter(
        (event) => !(event.id === action.payload.eventId && event.userEmail === action.payload.userEmail)
      );
      localStorage.setItem("eventRegistrations", JSON.stringify(state.list));
    }
  }
});

export const { registerEvent, cancelRegistration } = registrationSlice.actions;
export default registrationSlice.reducer;