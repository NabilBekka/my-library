import styles from "../Header/Header.module.css";

export default function Connexion() {
  return (
    <div data-testid="connexion" className={styles.connexion}>
      <button className={styles.login}>CONNEXION</button>
      <button className={styles.register}>INSCRIPTION</button>
    </div>
  )
}
