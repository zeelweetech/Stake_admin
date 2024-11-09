import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import crashGameReducer from "../features/games/crashSlice";
import gameDataFilterReducer from "../features/games/gameDataFilterSlice"
import gameDetailReducer from "../features/games/gameDetails"
import userInformationReducer from "../features/users/userInformationSlice"
import DashBoardReducer from "../features/DashBoard/DashBoardSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    crashGame: crashGameReducer,
    gameDataFilter: gameDataFilterReducer,
    gameDetail: gameDetailReducer,
    userInformation: userInformationReducer,
    dashBoard: DashBoardReducer
  },
});
export default store;
