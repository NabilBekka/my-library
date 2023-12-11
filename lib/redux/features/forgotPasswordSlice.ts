import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    display: false
};

const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState,
    reducers: {
        displayForgotPasswordAction: (state, action: PayloadAction<boolean>) => {
            state.display = action.payload;
        }
    }
});

const forgotPasswordReducer = forgotPasswordSlice.reducer;
export default forgotPasswordReducer;
export const { displayForgotPasswordAction } = forgotPasswordSlice.actions;