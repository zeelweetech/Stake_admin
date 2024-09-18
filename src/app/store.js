import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import crashGameReducer from "../features/games/crashSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    crashGame: crashGameReducer,
  },
});
export default store;
