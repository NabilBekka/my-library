import styles from "../Header/Header.module.css";
import Connexion from "../Connexion";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { displayParametersAction } from "@/lib/redux/features/parametersSlice";
import Modal from "../Modal";
import ToggleMode from "../ToggleMode";
import { displayModalAction } from "@/lib/redux/features/modalSlice";
import SignOut from "../SignOut";
import { displaySignOutAction } from "@/lib/redux/features/signOutSlice";
import { useRouter } from "next/router";

export default function Parameters() {
    const darkMode = useAppSelector(state => state.mode.darkMode);
    const displayModal = useAppSelector(state => state.modal.display);
    const displaySignOut = useAppSelector(state => state.signOut.display);
    const userConnected = useAppSelector(state => state.user.userConnected);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const dispalyModalHandler = (display:boolean):void => {
        dispatch(displayModalAction(display));
        dispatch(displayParametersAction(false));
      }
    const signOutHandler = ():void => {
        dispatch(displayModalAction(true));
        dispatch(displaySignOutAction(true));
    };
    const toUpdateProfil = ():void => {
        router.push("/updateProfil")
        dispatch(displayParametersAction(false));
    };
    return (
        createPortal(<div className={styles.parametersContainer} data-testid="parametersContainer">
            {
                userConnected && <div className={styles.darkMode} onClick={toUpdateProfil}>ÉDITER MON PROFIL</div>
            }
            {
                userConnected ? <div className={styles.darkMode} onClick={signOutHandler}>DÉCONNEXION</div> : <Connexion />
            }
            <p className={styles.darkMode} onClick={()=>dispatch(displayModalAction(true))}>
             {darkMode ? "MODE CLAIR" : "MODE SOMBRE"}
            </p>
            {
                displayModal && <Modal display={dispalyModalHandler}>
                    <ToggleMode />
                </Modal>
            }
            {
                displaySignOut && <Modal display={dispalyModalHandler}>
                    <SignOut />
                </Modal>
            }
        </div>, document.body)
    )
}
