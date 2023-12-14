import { configureStore } from '@reduxjs/toolkit';
import modeReducer from './features/modeSlice';
import modalReducer from './features/modalSlice';
import loginReducer from './features/loginSlice';
import registerReducer from './features/registerSlice';
import forgotPasswordReducer from './features/forgotPasswordSlice';
import parametersReducer from './features/parametersSlice';
import loadingReducer from './features/loadingSlice';

const store = configureStore({
  reducer: {
    mode: modeReducer,
    modal: modalReducer,
    login: loginReducer,
    register: registerReducer,
    forgotPasswprd: forgotPasswordReducer,
    parameters: parametersReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;