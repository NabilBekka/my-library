import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Message = string | null;
type Loading = {
    isSubmit: boolean,
    isLoading: boolean;
    success: Message
    error: Message;
}
const initialState: Loading = {
    isSubmit: false,
    isLoading: false,
    success: null,
    error: null
}

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        isSubmitAction: (state, action: PayloadAction<boolean>) => {
            state.isSubmit = action.payload;
        },
        isLoadingAction: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        successAction: (state, action: PayloadAction<Message>) => {
            state.success = action.payload;
        },
        errorAction: (state, action: PayloadAction<Message>) => {
            state.error = action.payload;
        }
    }
});

const loadingReducer = loadingSlice.reducer;
export default loadingReducer;
export const { isSubmitAction, isLoadingAction, successAction, errorAction } = loadingSlice.actions;