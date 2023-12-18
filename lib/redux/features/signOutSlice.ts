import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    display: false
};

const signOutSlice = createSlice({
    name: 'signOut',
    initialState,
    reducers: {
        displaySignOutAction: (state, action: PayloadAction<boolean>) => {
            state.display = action.payload;
        }
    }
});

const signOutReducer = signOutSlice.reducer;
export default signOutReducer;
export const { displaySignOutAction } = signOutSlice.actions;