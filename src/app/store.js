import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import crashGameReducer from "../features/games/crashSlice";
import gameDataFilterReducer from "../features/games/gameDataFilterSlice"
import gameDetailReducer from "../features/games/gameDetails"
import userInformationReducer from "../features/users/userInformationSlice"
import DashBoardReducer from "../features/DashBoard/DashBoardSlice"
import MedalReducer from "../features/medals/medalSlice"
import allGameReducer from "../features/games/allGameSlice"
import adminReducer from "../features/Admin/AdminSlice"
import otpReducer from "../features/games/otpSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    crashGame: crashGameReducer,
    gameDataFilter: gameDataFilterReducer,
    gameDetail: gameDetailReducer,
    userInformation: userInformationReducer,
    dashBoard: DashBoardReducer,
    medal:MedalReducer,
    allGame:allGameReducer,
    admin:adminReducer,
    otp:otpReducer,
  },
});
export default store;
