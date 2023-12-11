import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    display: false
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        displayRegisterAction: (state, action: PayloadAction<boolean>) => {
            state.display = action.payload;
        }
    }
});

const registerReducer = registerSlice.reducer;
export default registerReducer;
export const { displayRegisterAction } = registerSlice.actions;