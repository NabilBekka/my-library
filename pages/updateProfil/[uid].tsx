import { auth } from "@/lib/firebase/firebase";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { deleteUser, onAuthStateChanged, updatePassword } from "firebase/auth";
import { useRouter } from "next/router";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import styles from "@/styles/UpdateProfil.module.css";
import stylesCnx from "@/components/Connexion/Connexion.module.css";
import Modal from "@/components/Modal";
import { errorAction, isLoadingAction, isSubmitAction, successAction } from "@/lib/redux/features/loadingSlice";
import { userConnectedAction, userEmailAction, userUidAction } from "@/lib/redux/features/userSlice";

export default function UpdateProfilUid() {
    const [action, setAction] = useState('');
    const [password, setPassword] = useState('');
    const { name, email } = useAppSelector(state => state.user);
    const [displayModal , setDisplayModal] = useState(false);
    const { isSubmit, isLoading, success, error } = useAppSelector(state => state.loading);
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(!user){
                router.push('/');
            }else {
                if(router.query.uid !== user.uid){
                    router.push(`/updateProfil/${user.uid}`);
                }
            }
        })
    },[router]);

    const updatePasswordHandler = (e:SyntheticEvent<HTMLFormElement>):void => {
        e.preventDefault();
        submit();
        setPassword('');
        if(auth.currentUser){
            updatePassword(auth.currentUser, password)
            .then(()=>{
                dispatch(isLoadingAction(false));
                dispatch(successAction("Mot de passe modifié avec succès!"));
                setTimeout(()=>{
                    closeModal(false);
                },3000);
            })
            .catch((e:Error) => {
                dispatch(isLoadingAction(false));
                dispatch(errorAction(e.message));
                setTimeout(()=>{
                    dispatch(isSubmitAction(false));
                    dispatch(successAction(null));
                    dispatch(errorAction(null));
                },5000);
            })
        }
        
    }

    const deleteUserHandler = ():void => {
        submit();
        if(auth.currentUser){
            deleteUser(auth.currentUser)
                .then(() => {
                    dispatch(isLoadingAction(false));
                    dispatch(successAction("Votre compte a bien été suprimer"));
                    setTimeout(()=> {
                        dispatch(userConnectedAction(false));
                        dispatch(userUidAction(""));
                        dispatch(userEmailAction(""));
                        closeModal(false);
                    },3000);
                })
                .catch((e:Error) => {
                    dispatch(isLoadingAction(false));
                    dispatch(errorAction(e.message));
                    setTimeout(()=>{
                        dispatch(isSubmitAction(false));
                        dispatch(successAction(null));
                        dispatch(errorAction(null));
                    },5000);
                })
        }
    }

    const submit = (): void => {
        dispatch(successAction(null));
        dispatch(errorAction(null));
        dispatch(isSubmitAction(true));
        dispatch(isLoadingAction(true));
    }

    const actionHandler = (type: string):void => {
        setAction(type);
        setDisplayModal(true);
    }

    const closeModal = (display: boolean): void => {
        setDisplayModal(display);
        dispatch(successAction(null));
        dispatch(errorAction(null));
        dispatch(isSubmitAction(false));
        dispatch(isLoadingAction(false));

    }

    return (<main className={styles.main}>
        <h3 className={styles.title}>Mes infos</h3>
        <div className={styles.container}>
            <p><span className={styles.span}>Pseudo:</span> {name}</p>
            <p className={styles.modif} onClick={()=>actionHandler('pseudo')}>Modifier</p>
        </div>
        <div className={styles.container}>
            <p><span className={styles.span}>Email:</span> {email}</p>
        </div>
        <div className={styles.container}>
            <p><span className={styles.span}>Mot de passe:</span> ******</p>
            <p className={styles.modif} onClick={()=>actionHandler('password')}>Modifier</p>
        </div>
        <div className={styles.container}>
            <p className={styles.modif} style={{fontWeight: "bold"}} onClick={()=>actionHandler('delete')}>Suprimer mon compte</p>
        </div>
        {
            displayModal && <Modal display={closeModal}>
                {
                    !isSubmit ? <>{
                        action === 'pseudo' ? <div>pseudo</div> : 
                        action === 'password' ? <div>
                            <h3 className={stylesCnx.title}>Entrez votre nouveau mot de passe</h3>
                            <form className={stylesCnx.form} onSubmit={updatePasswordHandler}>
                                <input 
                                    type="password" 
                                    name="password" 
                                    className={stylesCnx.input} 
                                    value={password} 
                                    onChange={(e:ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)}
                                />
                                <div className={stylesCnx.btnLinkContainer}>
                                    <button className={stylesCnx.button} disabled={password.length<6}>VALIDER</button>
                                </div>
                            </form>
                        </div> : action === 'disable' ? <div>disable</div> :
                        action === 'delete' ? <>
                            <h3 className={stylesCnx.title}>Êtes-vous sûr de vouloir supprimer votre compte?</h3>
                            <div className={stylesCnx.toggleMode} data-testid='toggleMode'>
                                <button className={stylesCnx.button} onClick={deleteUserHandler}>OUI</button>
                                <button className={stylesCnx.button} onClick={() => closeModal(false)}>NON</button>
                            </div>
                        </> : null
                    }</> : isLoading ? <div>Chargement ...</div> : <div>{success ? success : error}</div>
                }
            </Modal>
        }
    </main>)
}