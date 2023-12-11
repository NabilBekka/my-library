import { useAppDispatch } from "@/lib/redux/hooks";
import styles from "../Connexion/Connexion.module.css";
import { displayForgotPasswordAction } from "@/lib/redux/features/forgotPasswordSlice";
import { displayLoginAction } from "@/lib/redux/features/loginSlice";

export default function Login() {
  const dispatch = useAppDispatch();
  
  return (<>
    <h3 className={styles.title}>CONNEXION</h3>
    <form data-testid='login' className={styles.form}>
        <input type="email" placeholder="EMAIL" className={styles.input} required/>
        <input type="password" placeholder="MOT DE PASSE" className={styles.input} required/>
        <div className={styles.btnLinkContainer}>
          <p onClick={() => {
            dispatch(displayForgotPasswordAction(true));
            dispatch(displayLoginAction(false));
          }} className={styles.link}>Mot de passe oublié?</p>
          <button className={styles.button}>SE CONNECTER</button>
        </div>
    </form>
  </>)
}
