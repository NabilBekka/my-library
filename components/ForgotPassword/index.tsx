import styles from "../Connexion/Connexion.module.css";

export default function ForgotPassword() {
  return (<>
    <h3 className={styles.title}>MOT DE PASSE OUBLIÉ</h3>
    <form data-testid='forgotPassword' className={styles.form}>
      <input type="mail" placeholder="EMAIL" className={styles.input} required/>
      <div className={styles.btnLinkContainer}>
        <button className={styles.button}>ENVOYER</button>
      </div>
    </form>
    </>)
}
