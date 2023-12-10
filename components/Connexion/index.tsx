import { useState } from "react";
import styles from "../Header/Header.module.css";
import Modal from "../Modal";
import Login from "../Login";
import Register from "../Register";
import ForgotPassword from "../ForgotPassword";

export default function Connexion() {
  const [dispalyModal, setDispalyModal] = useState(false);
  const [dispalyLoginForm, setDispalyLoginForm] = useState(false);
  const [dispalyRegisterForm, setDispalyRegisterForm] = useState(false);
  const [dispalyForgotPasswordForm, setDispalyForgotPasswordForm] = useState(false);

  const dispalyModalHandler = (display:boolean):void => {
    console.log("display modal")
    setDispalyModal(display);
    if(!display){
      setDispalyLoginForm(false);
      setDispalyRegisterForm(false);
      setDispalyForgotPasswordForm(false);
    }
  }
  const displayForgotPasswordHandler = (display:boolean):void => {
    setDispalyForgotPasswordForm(display);
  }
  return (<>
    <div data-testid="connexion" className={styles.connexion}>
      <button className={styles.login} onClick={() => {
        dispalyModalHandler(true);
        setDispalyLoginForm(true);
      }}>CONNEXION</button>
      <button className={styles.register} onClick={() => {
        dispalyModalHandler(true);
        setDispalyRegisterForm(true)
      }}>INSCRIPTION</button>
    </div>
    {dispalyModal && <>
      { dispalyLoginForm && <Modal display={dispalyModalHandler}>
          <Login displayForgotPasswordHandler={displayForgotPasswordHandler}  displayLoginForm={setDispalyLoginForm}/>
        </Modal> }
      { dispalyRegisterForm && <Modal display={dispalyModalHandler}>
          <Register displayLoginForm={setDispalyLoginForm} displayRegisterForm={setDispalyRegisterForm}/>
        </Modal> }
      { dispalyForgotPasswordForm && <Modal display={dispalyModalHandler}>
          <ForgotPassword />
        </Modal> }
    </>}
  </>)
}
