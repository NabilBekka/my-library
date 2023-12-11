import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkMode: false
};

const modeSlice = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        toggleMode: (state, action: PayloadAction<boolean>) => {
            state.darkMode = action.payload;
            localStorage.setItem('darkMode', `${action.payload}`)
        }
    }
});

const modeReducer = modeSlice.reducer;
export default modeReducer;
export const { toggleMode } = modeSlice.actions;