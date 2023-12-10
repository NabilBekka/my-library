import styles from "../Connexion/Connexion.module.css";

type Props = {
  displayLoginForm: (display:boolean) => void;
  displayRegisterForm: (display:boolean) => void;
}
export default function Register({displayLoginForm, displayRegisterForm}:Props) {
  return (<>
    <h3 className={styles.title}>INSCRIPTION</h3>
    <form data-testid='register' className={styles.form}>
      <input type="text" placeholder="PSEUDO" className={styles.input} required/>
      <input type="email" placeholder="EMAIL" className={styles.input} required/>
      <input type="password" placeholder="MOT DE PASSE" className={styles.input} required/>
      <input type="password" placeholder="CONFIRMER LE MOT DE PASSE" className={styles.input} required/>
      <div className={styles.btnLinkContainer}>
        <p onClick={()=>{
          displayLoginForm(true);
          displayRegisterForm(false);
          }} className={styles.link}>Déja inscrit?</p>
        <button className={styles.button}>S&apos;INSCRIRE</button>
      </div>
      
    </form>
  </>)
}
