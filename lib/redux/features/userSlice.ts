import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    userConnected: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userConnectedAction: (state, action: PayloadAction<boolean>) => {
            state.userConnected = action.payload;
        } 
    }
});

const userReducer = userSlice.reducer;
export default userReducer;
export const { userConnectedAction } = userSlice.actions;