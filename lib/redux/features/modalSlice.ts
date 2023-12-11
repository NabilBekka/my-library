import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    display: false
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        displayModalAction: (state, action: PayloadAction<boolean>) => {
            state.display = action.payload;
        }
    }
});

const modalReducer = modalSlice.reducer;
export default modalReducer;
export const { displayModalAction } = modalSlice.actions;