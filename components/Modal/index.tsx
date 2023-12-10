import { PropsWithChildren } from "react";
import styles from "./Modal.module.css";
import Image from "next/image";

type Props = PropsWithChildren<{
  display: (d:boolean) => void;
}>

export default function Modal({children, display}:Props) {
  return (
    <div className={styles.container}>
        <div className={styles.mainDiv} data-testid='mainDiv'>
            <Image 
              src="./images/exitLogo.svg"
              alt="Fermer"
              width={30}
              height={30}
              onClick={() => display(false)}
            />
            {children}
        </div>
    </div>
  )
}
