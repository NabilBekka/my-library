import { SyntheticEvent, useEffect, useRef } from "react";
import styles from "../Connexion/Connexion.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { errorAction, isLoadingAction, isSubmitAction, successAction } from "@/lib/redux/features/loadingSlice";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";

export default function ForgotPassword() {
  const emailRef = useRef<HTMLInputElement>(null);
  const {isSubmit, isLoading, success, error } = useAppSelector(state => state.loading);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(isSubmitAction(true));
    dispatch(isLoadingAction(true));
    if(emailRef.current?.value){
      sendPasswordResetEmail(auth, emailRef.current?.value)
        .then(() => {
          dispatch(isLoadingAction(false));
          dispatch(successAction("Un email de réinitialisation a été envoyé à votre adresse email"));
        })
        .catch((e: Error) => {
          dispatch(isLoadingAction(false));
          if(e.message === "Firebase: Error (auth/invalid-email)."){
            dispatch(errorAction("Adresse email invalide"));
          }else {
            dispatch(errorAction(e.message));
          }
          setTimeout(()=>{
            dispatch(successAction(null));
            dispatch(isSubmitAction(false));
            dispatch(isLoadingAction(false));
            dispatch(errorAction(null));
          },3000);
        })
    }
    
  }
  return (<>
    {
      !isSubmit ? <>
        <h3 className={styles.title}>MOT DE PASSE OUBLIÉ</h3>
        <form data-testid='forgotPassword' className={styles.form} onSubmit={handleSubmit}>
          <input type="mail" placeholder="EMAIL" className={styles.input} ref={emailRef} required/>
          <div className={styles.btnLinkContainer}>
            <button className={styles.button}>ENVOYER</button>
          </div>
        </form>
      </> : isLoading ? <div>Chargment ...</div> : <p>{success ? success : error}</p>
    }
  </>)
}
