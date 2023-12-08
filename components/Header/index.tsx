import Image from "next/image";
import styles from "./Header.module.css";
import { useAppSelector } from "@/lib/redux/hooks";
import Connexion from "../Connexion";
import { useRouter } from "next/router";

export default function Header() {
  const darkMode = useAppSelector(state => state.mode.darkMode);
  const router = useRouter();

  const toHomePage = ():void => {
    router.push("./");
  };

  const displayParameters = ():void => {

  }
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
          onClick={displayParameters}
        />
      </div>
    </header>
  )
}
