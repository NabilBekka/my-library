import { toggleMode } from "@/lib/redux/features/mode/modeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { PropsWithChildren, useEffect } from "react"
import Header from "../Header";

type Props = PropsWithChildren<{}>

export default function Layout({children}:Props) {
  const darkMode = useAppSelector(state => state.mode.darkMode);
  const darkModeDispatch = useAppDispatch();
  
  useEffect(() => {
    // If the choice of darkMode exists in localStorage, we update the state in the Redux Store
    const localStorageDarkMode = localStorage.getItem('darkMode');
    if (localStorageDarkMode) {
      const darkModeStorage = JSON.parse(localStorageDarkMode);
      darkModeDispatch(toggleMode(darkModeStorage));
    }

    // Modifying css variables
    if(darkMode){
      document.documentElement.style.setProperty("--backgroundColor", "#000B00");
      document.documentElement.style.setProperty("--textColor", "#f0fff0");
    }else {
      document.documentElement.style.setProperty("--backgroundColor", "#f0fff0");
      document.documentElement.style.setProperty("--textColor", "#000B00");
    }
  }, [darkMode, darkModeDispatch]);

  const toDarkMode = () => {
    darkModeDispatch(toggleMode(true));
  }
  const toLightMode = () => {
    darkModeDispatch(toggleMode(false));
  }
  return (
    <>
      <Header />
      {/* <button onClick={toDarkMode}>darkMode</button>
      <button onClick={toLightMode}>lightMode</button> */}
      {children}
    </>
  )
}