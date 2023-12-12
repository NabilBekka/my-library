import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    display: false
};

const parametersSlice = createSlice({
    name: 'parameters',
    initialState,
    reducers: {
        displayParametersAction: (state, action: PayloadAction<boolean>) => {
            state.display = action.payload
        }
    }
});

const parametersReducer = parametersSlice.reducer;
export default parametersReducer;
export const { displayParametersAction } = parametersSlice.actions;