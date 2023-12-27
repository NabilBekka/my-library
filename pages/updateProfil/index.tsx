import { auth } from "@/lib/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react"

export default function UpdateProfil() {
    const router = useRouter();

    useEffect(()=>{
        onAuthStateChanged(auth, user => {
            if(user){
                router.push(`/updateProfil/${user.uid}`)
            } else {
                router.push('/');
            }
        })
    },[router]);
    return (<main>
        
        </main>
    )
}
