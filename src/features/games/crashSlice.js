import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameInformation: {},
  weeklyBetsAmount: "Current Week",
};

const crashGameSlice = createSlice({
  name: "crashGame",
  initialState,
  reducers: {
    setGameInformation: (state, action) => {
      state.gameInformation = action.payload;
    },
    setWeeklyBetsAmount: (state, action) => {
      state.weeklyBetsAmount = action.payload;
    },
  },
});

export const { setGameInformation, setWeeklyBetsAmount } =
  crashGameSlice.actions;

export default crashGameSlice.reducer;
