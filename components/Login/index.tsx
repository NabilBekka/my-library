import styles from "../Connexion/Connexion.module.css";

type Props = {
  displayForgotPasswordHandler: (display: boolean) => void;
  displayLoginForm: (diplay: boolean) => void;
}

export default function Login({displayForgotPasswordHandler, displayLoginForm}:Props) {
  return (<>
    <h3 className={styles.title}>CONNEXION</h3>
    <form data-testid='login' className={styles.form}>
        <input type="email" placeholder="EMAIL" className={styles.input} required/>
        <input type="password" placeholder="MOT DE PASSE" className={styles.input} required/>
        <div className={styles.btnLinkContainer}>
          <p onClick={() => {
            displayForgotPasswordHandler(true);
            displayLoginForm(false);
          }} className={styles.link}>Mot de passe oublié?</p>
          <button className={styles.button}>SE CONNECTER</button>
        </div>
    </form>
  </>)
}
