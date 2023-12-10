import { PropsWithChildren, ReactEventHandler, SyntheticEvent } from "react";
import styles from "./Modal.module.css";
import Image from "next/image";

type Props = PropsWithChildren<{
  display: (d:boolean) => void;
}>

export default function Modal({children, display}:Props) {
  return (
    <div className={styles.container} data-testid="modal" onClick={() => display(false)}>
        <div className={styles.mainDiv} data-testid='mainDiv' onClick={(e: SyntheticEvent) => e.stopPropagation()}>
            <Image 
              src="./images/exitLogo.svg"
              alt="Fermer"
              width={30}
              height={30}
              onClick={() => display(false)}
              className={styles.exitLogo}
            />
            {children}
        </div>
    </div>
  )
}
