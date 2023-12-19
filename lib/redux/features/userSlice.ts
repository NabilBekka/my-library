import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    userConnected: false,
    uid: '',
    name:''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userConnectedAction: (state, action: PayloadAction<boolean>) => {
            state.userConnected = action.payload;
        },
        userUidAction: (state, action: PayloadAction<string>) => {
            state.uid = action.payload;
        },
        userNameAction: (state, action: PayloadAction<string>) => {
            state.uid = action.payload;
        },
    }
});

const userReducer = userSlice.reducer;
export default userReducer;
export const { userConnectedAction, userUidAction, userNameAction } = userSlice.actions;