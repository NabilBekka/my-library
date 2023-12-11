import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    display: false
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        displayLoginAction: (state, action: PayloadAction<boolean>) => {
            state.display = action.payload;
        }
    }
});

const loginReducer = loginSlice.reducer;
export default loginReducer;
export const { displayLoginAction } = loginSlice.actions;