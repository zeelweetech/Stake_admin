
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dashboardData: {},
    pullPlayerStats: "Player Stats"
};

const DashBoardSlice = createSlice({
    name: "dashBoard",
    initialState,
    reducers: {
        setDashBoardData: (state, action) => {
            state.dashboardData = action.payload;
        },
        setPullPlayerStats: (state, action) => {
            state.pullPlayerStats = action.payload;
        }
    },
});

export const { setDashBoardData, setPullPlayerStats } = DashBoardSlice.actions;
export default DashBoardSlice.reducer;
