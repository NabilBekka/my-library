import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import styles from "../Connexion/Connexion.module.css";
import { displayForgotPasswordAction } from "@/lib/redux/features/forgotPasswordSlice";
import { displayLoginAction } from "@/lib/redux/features/loginSlice";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { errorAction, isLoadingAction, isSubmitAction, successAction } from "@/lib/redux/features/loadingSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { displayModalAction } from "@/lib/redux/features/modalSlice";

type Profil = {
  email: string;
  password: string;
}

export default function Login() {
  const dataProfil: Profil = {
    email:'',
    password:''
  } 
  const [profil, setProfil] = useState<Profil>(dataProfil);
  const { email, password } = profil;
  const isSubmit = useAppSelector(state => state.loading.isSubmit);
  const isLoading = useAppSelector(state => state.loading.isLoading);
  const success = useAppSelector(state => state.loading.success);
  const error = useAppSelector(state => state.loading.error);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    return () => {
      dispatch(isSubmitAction(false));
      dispatch(isLoadingAction(false));
      dispatch(successAction(null));
      dispatch(errorAction(null));
    }
  },[dispatch]);

  const emailChange = (e:ChangeEvent<HTMLInputElement>): void => {
    setProfil( state => ({...state, email : e.target.value}))
  };
  const passwordChange = (e:ChangeEvent<HTMLInputElement>): void => {
    setProfil( state => ({...state, password : e.target.value}))
  };
  const handleSubmit = (e:SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(isSubmitAction(true));
    dispatch(isLoadingAction(true));
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        dispatch(successAction("Connexion avec succès!"));
        dispatch(isLoadingAction(false));
        setTimeout(() => {
          dispatch(displayModalAction(false));
        },2000);
      })
      .catch((error:Error) => {
        if (error.message === "Firebase: Error (auth/invalid-credential)."){
          dispatch(errorAction("Les informations de connexion sont incorrectes!"));
        }else {
          dispatch(errorAction(error.message));
        };
        dispatch(isLoadingAction(false));
        setTimeout(() => {
          setProfil(dataProfil);
          dispatch(isSubmitAction(false));
          dispatch(errorAction(null));
        },3000);
      })
  };

  const btnDisabled: boolean = password.length < 6 || !email.includes('@') || !email.includes('.');
  
  return (<>
    <h3 className={styles.title}>CONNEXION</h3>
    {
      !isSubmit ? <form data-testid='login' className={styles.form} onSubmit={handleSubmit}>
          <input type="email" placeholder="EMAIL" className={styles.input} required value={email} onChange={emailChange}/>
          <input type="password" placeholder="MOT DE PASSE" className={styles.input} required value={password} onChange={passwordChange}/>
          <div className={styles.btnLinkContainer}>
            <p onClick={() => {
              dispatch(displayForgotPasswordAction(true));
              dispatch(displayLoginAction(false));
            }} className={styles.link}>Mot de passe oublié?</p>
            <button className={styles.button} disabled={btnDisabled}>SE CONNECTER</button>
          </div>
      </form> : isLoading ? <div>Chargement ...</div> : <div>{success ? success : error}</div>
    } 
  </>)
}
