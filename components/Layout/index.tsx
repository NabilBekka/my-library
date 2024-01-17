import { toggleModeAction } from "@/lib/redux/features/modeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { PropsWithChildren, useEffect } from "react"
import Header from "../Header";
import { auth, user } from "@/lib/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { userConnectedAction, userEmailAction, userNameAction, userUidAction } from "@/lib/redux/features/userSlice";
import { getDoc } from "firebase/firestore";

type Props = PropsWithChildren<{}>

export default function Layout({children}:Props) {
  const darkMode = useAppSelector(state => state.mode.darkMode);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    // If the choice of darkMode exists in localStorage, we update the state in the Redux Store
    const localStorageDarkMode = localStorage.getItem('darkMode');
    if (localStorageDarkMode) {
      const darkModeStorage = JSON.parse(localStorageDarkMode);
      dispatch(toggleModeAction(darkModeStorage));
    }

    // Modifying css variables
    if(darkMode){
      document.documentElement.style.setProperty("--backgroundColor", "#000B00");
      document.documentElement.style.setProperty("--textColor", "#f0fff0");
    }else {
      document.documentElement.style.setProperty("--backgroundColor", "#f0fff0");
      document.documentElement.style.setProperty("--textColor", "#000B00");
    }

    //Get user information
    onAuthStateChanged(auth, (userCredential) => {
      if(userCredential){
        dispatch(userConnectedAction(true));
        dispatch(userUidAction(userCredential.uid));
        userCredential.email && dispatch(userEmailAction(userCredential.email));
        getDoc(user(userCredential.uid))
          .then((datas)=> {
            if (datas.exists()){
              dispatch(userNameAction(datas.data().pseudo));
            }
          })
          .catch(()=> {
            dispatch(userNameAction("Nous avons une erreur!"));
          })
      }
    });
  }, [darkMode, dispatch]);
  return (
    <>
      <Header />
      {children}
    </>
  )
}
