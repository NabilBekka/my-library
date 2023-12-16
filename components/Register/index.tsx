import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import styles from "../Connexion/Connexion.module.css";
import { displayLoginAction } from "@/lib/redux/features/loginSlice";
import { displayRegisterAction } from "@/lib/redux/features/registerSlice";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { errorAction, isLoadingAction, isSubmitAction, successAction } from "@/lib/redux/features/loadingSlice";
import { displayModalAction } from "@/lib/redux/features/modalSlice";

type InfoProfil = {
  pseudo: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const dataProfil: InfoProfil = {
    pseudo:'',
    email:'',
    password:'',
    confirmPassword:''
  }
  const [infoProfil, setInfoProfil] = useState<InfoProfil>(dataProfil);
  const { pseudo, email, password, confirmPassword } = infoProfil;
  const isSubmit = useAppSelector(state => state.loading.isSubmit);
  const isLoading = useAppSelector(state => state.loading.isLoading);
  const success = useAppSelector(state => state.loading.success);
  const error = useAppSelector(state => state.loading.error);
  const dispatch = useAppDispatch();

  const pseudoChange = (e:ChangeEvent<HTMLInputElement>): void => {
    setInfoProfil( state => ({...state, pseudo : e.target.value}))
  }
  const emailChange = (e:ChangeEvent<HTMLInputElement>): void => {
    setInfoProfil( state => ({...state, email : e.target.value}))
  }
  const passwordChange = (e:ChangeEvent<HTMLInputElement>): void => {
    setInfoProfil( state => ({...state, password : e.target.value}))
  }
  const confirmPasswordChange = (e:ChangeEvent<HTMLInputElement>): void => {
    setInfoProfil( state => ({...state, confirmPassword : e.target.value}))
  }

  const handleSubmit = (e:SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(isSubmitAction(true));
    dispatch(isLoadingAction(true));
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch(successAction("Inscription avec succès!"));
        dispatch(isLoadingAction(false));
        setTimeout(() => {
          dispatch(displayModalAction(false));
        },2000);
      })
      .catch((error: Error) => {
        if (error.message === "Firebase: Error (auth/email-already-in-use)."){
          dispatch(errorAction("Adresse email déja utilisée!"));
        }else {
          dispatch(errorAction(error.message));
        };
        dispatch(isLoadingAction(false));
        setTimeout(() => {
          setInfoProfil(dataProfil);
          dispatch(isSubmitAction(false));
          dispatch(isLoadingAction(false));
          dispatch(errorAction(null));
        },3000);
      })
  };

  useEffect(() => {
    return () => {
      dispatch(isSubmitAction(false));
      dispatch(isLoadingAction(false));
      dispatch(successAction(null));
      dispatch(errorAction(null));
    }
  },[dispatch]);

  const btnDisabled: boolean = password.length<6 || password!=confirmPassword || !email.includes('@') || !email.includes('.')
  
  return (<>
    <h3 className={styles.title}>INSCRIPTION</h3>
    {
      !isSubmit ? 
      <form data-testid='register' className={styles.form} onSubmit={handleSubmit}>
        <input type="text" placeholder="PSEUDO" className={styles.input} value={pseudo} required onChange={pseudoChange}/>
        <input type="email" placeholder="EMAIL" className={styles.input} value={email} required onChange={emailChange}/>
        <input type="password" placeholder="MOT DE PASSE" className={styles.input} value={password} required onChange={passwordChange}/>
        <input type="password" placeholder="CONFIRMER LE MOT DE PASSE" className={styles.input} value={confirmPassword} required onChange={confirmPasswordChange}/>
        <div className={styles.btnLinkContainer}>
          <p onClick={()=>{
            dispatch(displayLoginAction(true));
            dispatch(displayRegisterAction(false));
            }} className={styles.link}>Déja inscrit?</p>
          <button className={styles.button} disabled= {btnDisabled}>S&apos;INSCRIRE</button>
        </div>
      </form> : isLoading ? <div>Chargement ...</div> : <div>{success ? success : error}</div>
    }
  </>)
}