import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInformation: {},
  weeklyBetsAmount: "Current Week",
};

const userInformationSlice = createSlice({
  name: "userInformation",
  initialState,
  reducers: {
    setUserInformation: (state, action) => {
      state.userInformation = action.payload;
    },
    setWeeklyBetsAmount: (state, action) => {
      state.weeklyBetsAmount = action.payload;
    },
  },
});

export const { setUserInformation, setWeeklyBetsAmount } =
  userInformationSlice.actions;
export default userInformationSlice.reducer;
