import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pullsData: [],
};

const gameDetailSlice = createSlice({
  name: "gameDetail",
  initialState,
  reducers: {
    setPullsData: (state, action) => {
      state.isOpenFilter = action.payload;
    },
  },
});

export const { setPullsData } = gameDetailSlice.actions;
export default gameDetailSlice.reducer;
