import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    medalData: [],

};

const MedalSlice = createSlice({
    name: "medal",
    initialState,
    reducers: {
        setMedalData: (state, action) => {
            state.medalData = action.payload;
        },
    },
});

export const { setMedalData } = MedalSlice.actions;
export default MedalSlice.reducer;