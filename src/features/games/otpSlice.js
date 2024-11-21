import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    email: {}
};

const otpSlice = createSlice({
    name: "otp",
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload
        }
    }
});

export const {setEmail} = otpSlice.actions
export default otpSlice.reducer