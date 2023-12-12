import styles from "../Header/Header.module.css";
import Connexion from "../Connexion";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { displayParametersAction } from "@/lib/redux/features/parametersSlice";
import Modal from "../Modal";
import ToggleMode from "../ToggleMode";
import { displayModalAction } from "@/lib/redux/features/modalSlice";

export default function Parameters() {
    const darkMode = useAppSelector(state => state.mode.darkMode);
    const displayModal = useAppSelector(state => state.modal.display);
    const dispatch = useAppDispatch();

    const dispalyModalHandler = (display:boolean):void => {
        dispatch(displayModalAction(display));
        dispatch(displayParametersAction(false));
      }

    const darkModeHandler = ():void => {
        dispatch(displayModalAction(true));
    };
    return (
        createPortal(<div className={styles.parametersContainer} data-testid="parametersContainer">
            <Connexion />
            <p className={styles.darkMode} onClick={darkModeHandler}>
             {darkMode ? "MODE CLAIR" : "MODE SOMBRE"}
            </p>
            {
                displayModal && <Modal display={dispalyModalHandler}>
                    <ToggleMode />
                </Modal>
            }
        </div>, document.body)
    )
}
