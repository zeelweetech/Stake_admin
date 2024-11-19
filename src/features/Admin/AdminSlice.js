import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    adminData: {
        admins: [],
        pagination: {},
    },
};

const AdminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdminData: (state,action) => {
            state.adminData = action.payload;
        }
    }
});

export const {setAdminData} = AdminSlice.actions;
export default AdminSlice.reducer;