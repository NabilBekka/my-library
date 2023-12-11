import { configureStore } from '@reduxjs/toolkit';
import modeReducer from './features/modeSlice';
import modalReducer from './features/modalSlice';
import loginReducer from './features/loginSlice';
import registerReducer from './features/registerSlice';
import forgotPasswordReducer from './features/forgotPasswordSlice';

const store = configureStore({
  reducer: {
    mode: modeReducer,
    modal: modalReducer,
    login: loginReducer,
    register: registerReducer,
    forgotPasswprd: forgotPasswordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;