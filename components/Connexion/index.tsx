import styles from "../Header/Header.module.css";
import Modal from "../Modal";
import Login from "../Login";
import Register from "../Register";
import ForgotPassword from "../ForgotPassword";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { displayModalAction } from "@/lib/redux/features/modalSlice";
import { displayLoginAction } from "@/lib/redux/features/loginSlice";
import { displayRegisterAction } from "@/lib/redux/features/registerSlice";
import { displayForgotPasswordAction } from "@/lib/redux/features/forgotPasswordSlice";
import { displayParametersAction } from "@/lib/redux/features/parametersSlice";
import { errorAction, isLoadingAction, isSubmitAction, successAction } from "@/lib/redux/features/loadingSlice";
import { displaySignOutAction } from "@/lib/redux/features/signOutSlice";

export default function Connexion() {
  const displayModal = useAppSelector(state => state.modal.display);
  const displayLogin = useAppSelector(state => state.login.display);
  const displayRegister = useAppSelector(state => state.register.display);
  const displayForgotPassword = useAppSelector(state => state.forgotPasswprd.display);
  const dispatch = useAppDispatch();

  const dispalyModalHandler = (display:boolean):void => {
    dispatch(displayModalAction(display));
    if(!display){
      dispatch(displayLoginAction(false));
      dispatch(displayRegisterAction(false));
      dispatch(displayForgotPasswordAction(false));
      dispatch(displaySignOutAction(false));
      dispatch(successAction(null));
      dispatch(isSubmitAction(false));
      dispatch(isLoadingAction(false));
      dispatch(errorAction(null));
    }
  }

  return (<>
    <div data-testid="connexion" className={styles.connexion}>
      <button className={styles.login} onClick={() => {
        dispatch(displayModalAction(true));
        dispatch(displayLoginAction(true));
        dispatch(displayParametersAction(false));
      }}>CONNEXION</button>
      <button className={styles.register} onClick={() => {
        dispatch(displayModalAction(true));
        dispatch(displayRegisterAction(true));
        dispatch(displayParametersAction(false));
      }}>INSCRIPTION</button>
    </div>
    {displayModal &&  <>
      { displayLogin && <Modal display={dispalyModalHandler}>
          <Login />
        </Modal> }
      { displayRegister && <Modal display={dispalyModalHandler}>
          <Register />
        </Modal> }
      { displayForgotPassword && <Modal display={dispalyModalHandler}>
          <ForgotPassword />
        </Modal> }
    </>}
  </>)
}
