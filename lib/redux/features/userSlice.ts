import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    userConnected: false,
    uid: '',
    name:'',
    email:''
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
            state.name = action.payload;
        },
        userEmailAction: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
    }
});

const userReducer = userSlice.reducer;
export default userReducer;
export const { userConnectedAction, userUidAction, userNameAction, userEmailAction } = userSlice.actions;