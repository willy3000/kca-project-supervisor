import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: JSON.parse(localStorage.getItem("superuser")) },
  reducers: {
    authenticateUser: (state, action) => {
      state.user = action.payload;
    },
    deAuthenticateUser: (state, action) => {
      state.user = null;
    },
  },
});

export const { authenticateUser, deAuthenticateUser } = userSlice.actions;

export default userSlice.reducer;
