type Props = {
  displayLoginForm: (display:boolean) => void;
  displayRegisterForm: (display:boolean) => void;
}
export default function Register({displayLoginForm, displayRegisterForm}:Props) {
  return (
    <form data-testid='register'>
      <input type="text" placeholder="PSEUDO"/>
      <input type="email" placeholder="EMAIL"/>
      <input type="password" placeholder="MOT DE PASSE"/>
      <input type="password" placeholder="CONFIRMER LE MOT DE PASSE"/>
      <p onClick={()=>{
        displayLoginForm(true);
        displayRegisterForm(false);
        }}>Déja inscrit?</p>
      <button>S&apos;INSCRIRE</button>
    </form>
  )
}
