import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pullsData: [],
  paginationModel: {
    'page': 0,
    'pageSize': 10,
  }
};

const gameDetailSlice = createSlice({
  name: "gameDetail",
  initialState,
  reducers: {
    setPullsData: (state, action) => {
      state.pullsData = action.payload;
    },
    setPaginationModel: (state, action) => {
      state.paginationModel = action.payload
    }
  },
});

export const { setPullsData, setPaginationModel } = gameDetailSlice.actions;
export default gameDetailSlice.reducer;
