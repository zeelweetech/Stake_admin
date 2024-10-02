import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUser: null,
  isToken: null,
  isAuthenticated: false, 
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isUser = action.payload.isUser;
      state.isToken = action.payload.isToken;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.isAuthenticated = false;
    },

  },
});

export const { loginSuccess, loginFailure } = authSlice.actions;
export default authSlice.reducer;
