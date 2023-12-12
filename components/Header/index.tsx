import Image from "next/image";
import styles from "./Header.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import Connexion from "../Connexion";
import { useRouter } from "next/router";
import Parameters from "../Parameters";
import { displayParametersAction } from "@/lib/redux/features/parametersSlice";

export default function Header() {
  const displayParameters = useAppSelector(state => state.parameters.display);
  const darkMode = useAppSelector(state => state.mode.darkMode);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const toHomePage = ():void => {
    router.push("./");
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title} onClick={toHomePage}>MY LIBRARY</h1>
      <div className={styles.container}>
        <Connexion />
        <Image 
          src={darkMode ? "./images/parametersWight.svg" : "./images/parametersDark.svg"}
          alt="Logo paramètres"
          width={30}
          height={30}
          className={styles.parameters}
          onClick={() => dispatch(displayParametersAction(!displayParameters))}
        />
      </div>
      { displayParameters && <Parameters /> }
    </header>
  )
}
