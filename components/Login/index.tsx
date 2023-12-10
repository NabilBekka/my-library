type Props = {
  displayForgotPasswordHandler: (display: boolean) => void;
  displayLoginForm: (diplay: boolean) => void;
}
export default function Login({displayForgotPasswordHandler, displayLoginForm}:Props) {
  return (
    <form data-testid='login'>
        <input type="email" placeholder="EMAIL"/>
        <input type="text" placeholder="MOT DE PASSE"/>
        <p onClick={() => {
          displayForgotPasswordHandler(true);
          displayLoginForm(false);
        }}>Mot de passe oublié?</p>
        <button>SE CONNECTER</button>
    </form>
  )
}
