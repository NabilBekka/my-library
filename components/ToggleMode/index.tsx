import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import styles from "../Connexion/Connexion.module.css";
import { toggleModeAction } from "@/lib/redux/features/modeSlice";
import { displayModalAction } from "@/lib/redux/features/modalSlice";
import { displayParametersAction } from "@/lib/redux/features/parametersSlice";

export default function ToggleMode() {
    const mode = useAppSelector(state => state.mode.darkMode);
    const dispatch = useAppDispatch();

    const toggleModeHandler = (mode: boolean):void => {
        dispatch(toggleModeAction(mode));
        dispatch(displayModalAction(false));
        dispatch(displayParametersAction(false));
    }
    return (
        <>
            <h3 className={styles.title}>{`Vouliez-vous passer en ${mode ? "mode clair" : "mode sombre"}?`}</h3>
            <div className={styles.toggleMode} data-testid='toggleMode'>
                <button className={styles.button} onClick={() => toggleModeHandler(!mode)}>OUI</button>
                <button className={styles.button} onClick={() => toggleModeHandler(mode)}>NON</button>
            </div>
        </>
    )
}
