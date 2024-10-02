import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import crashGameReducer from "../features/games/crashSlice";
import gameDataFilterReducer from "../features/games/gameDataFilterSlice"
import gameDetailReducer from "../features/games/gameDetails"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    crashGame: crashGameReducer,
    gameDataFilter: gameDataFilterReducer,
    gameDetail: gameDetailReducer
  },
});
export default store;
