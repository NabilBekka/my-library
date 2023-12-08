import { configureStore } from '@reduxjs/toolkit';
import modeReducer from './features/mode/modeSlice';

const store = configureStore({
  reducer: {
    mode: modeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;