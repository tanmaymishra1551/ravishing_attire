import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        accessToken: null,
    },
    reducers: {
        saveAuthToken: (state, action) => {
            state.accessToken = action.payload;
        },
        clearAuthToken: (state) => {
            state.accessToken = null;
        },
    },
});

export const { saveAuthToken, clearAuthToken } = authSlice.actions;

export default authSlice.reducer;
