import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import styles from "../Connexion/Connexion.module.css";
import { displayForgotPasswordAction } from "@/lib/redux/features/forgotPasswordSlice";
import { displayLoginAction } from "@/lib/redux/features/loginSlice";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { errorAction, isLoadingAction, isSubmitAction } from "@/lib/redux/features/loadingSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { displayModalAction } from "@/lib/redux/features/modalSlice";
import { userConnectedAction } from "@/lib/redux/features/userSlice";

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
  const { isSubmit, isLoading, success, error } = useAppSelector(state => state.loading);
  const dispatch = useAppDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setProfil((state) => ({ ...state, [name]: value }));
  };
  const handleSubmit = (e:SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(isSubmitAction(true));
    dispatch(isLoadingAction(true));
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch(isLoadingAction(false));
        dispatch(userConnectedAction(true));
        dispatch(isSubmitAction(false));
        dispatch(displayModalAction(false));
        dispatch(displayLoginAction(false));
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
          <input type="email" name="email" placeholder="EMAIL" className={styles.input} required value={email} onChange={handleInputChange}/>
          <input type="password" name="password" placeholder="MOT DE PASSE" className={styles.input} required value={password} onChange={handleInputChange}/>
          <div className={styles.btnLinkContainer}>
            <p onClick={() => {
              dispatch(displayForgotPasswordAction(true));
              dispatch(displayLoginAction(false));
            }} className={styles.link}>Mot de passe oublié?</p>
            <button className={styles.button} disabled={btnDisabled}>SE CONNECTER</button>
          </div>
      </form> : isLoading ? <div>Chargement ...</div> : error ? <div>{error}</div> : null
    } 
  </>)
}
