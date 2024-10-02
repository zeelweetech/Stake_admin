import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenFilter: false,
  date: {},
  selected: {
    'pullId': "fixed",
    'crashPoint': "fixed",
    'playerCount': "fixed",
    'totalAmount': "fixed",
  },
  searchValue: {
    'pullId': "",
    'crashPoint': "",
    'playerCount': "",
    'totalAmount': "",
    'pullIdRange': [0, 0],
    'crashPointRange': [0, 0],
    'playerCountRange': [0, 0],
    'totalAmountRange': [0, 0],
    'sortOrder': "DESC",
  },
  searchTerm: '',
};

const gameDataFilterSlice = createSlice({
  name: "gameDataFilter",
  initialState,
  reducers: {
    setIsOpenFilter: (state, action) => {
      state.isOpenFilter = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    setSearchValue: (state, action) => {
        state.searchValue = action.payload
    },
    setSearchTerm: (state, action) => {
        state.searchTerm = action.payload
    }
  },
});

export const { setIsOpenFilter, setDate, setSelected, setSearchValue, setSearchTerm } =
  gameDataFilterSlice.actions;
export default gameDataFilterSlice.reducer;
