import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import styles from "../Connexion/Connexion.module.css";
import { displaySignOutAction } from "@/lib/redux/features/signOutSlice";
import { displayModalAction } from "@/lib/redux/features/modalSlice";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { userConnectedAction } from "@/lib/redux/features/userSlice";
import { isLoadingAction, isSubmitAction } from "@/lib/redux/features/loadingSlice";
import { displayParametersAction } from "@/lib/redux/features/parametersSlice";

export default function SignOut() {
    const { isSubmit, isLoading } = useAppSelector(state => state.loading);
    const dispatch = useAppDispatch();

    const confirmSignout = (): void => {
        dispatch(isSubmitAction(true));
        dispatch(isLoadingAction(true));
        signOut(auth)
        .then(() => {
            dispatch(userConnectedAction(false));
            dispatch(isSubmitAction(false));
            dispatch(isLoadingAction(false));
            dispatch(displaySignOutAction(false));
            dispatch(displayModalAction(false));
        })
        .catch(() => {
            dispatch(isLoadingAction(false));
            setTimeout(() => {
                dispatch(isSubmitAction(false));
                dispatch(displayModalAction(false));
                dispatch(displaySignOutAction(false));
            },2000);
        })
        .finally(()=>{
            dispatch(displayParametersAction(false));
        })
    };
    const notSignout = (): void => {
        dispatch(displayModalAction(false));
        dispatch(displaySignOutAction(false));
        dispatch(displayParametersAction(false));
    };
    return (<> 
        { !isSubmit ? <>
                <h3 className={styles.title}>Êtes-vous sûr de vouloir vous déconnecter ?</h3>
                <div className={styles.toggleMode} data-testid='signOut'>
                    <button className={styles.button} onClick={confirmSignout}>OUI</button>
                    <button className={styles.button} onClick={notSignout}>NON</button>
                </div>
            </> : isLoading ? <div>Chargement ...</div> : <p>Oups! La déconnexion a échoué.</p>
        }          
    </>)
}
