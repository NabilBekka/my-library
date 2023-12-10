import { fireEvent, render } from '@/lib/redux/reduxRender.test';
import '@testing-library/jest-dom';
import Register from '.';

const displayLoginForm = jest.fn();
const displayRegisterForm = jest.fn();

describe('Test the Register component', () => {
    it('should renders pseudo input', () => {
        const { getByPlaceholderText } = render(<Register displayLoginForm={displayLoginForm} displayRegisterForm={displayRegisterForm}/>);
        const pseudo = getByPlaceholderText('PSEUDO');
        expect(pseudo).toBeInTheDocument();
    });
    it('should renders email input', () => {
        const { getByPlaceholderText } = render(<Register displayLoginForm={displayLoginForm} displayRegisterForm={displayRegisterForm}/>);
        const email = getByPlaceholderText('EMAIL');
        expect(email).toBeInTheDocument();
    });
    it('should renders password input', () => {
        const { getByPlaceholderText } = render(<Register displayLoginForm={displayLoginForm} displayRegisterForm={displayRegisterForm}/>);
        const password = getByPlaceholderText('MOT DE PASSE');
        expect(password).toBeInTheDocument();
    });
    it('should renders confirm password input', () => {
        const { getByPlaceholderText } = render(<Register displayLoginForm={displayLoginForm} displayRegisterForm={displayRegisterForm}/>);
        const confirmPassword = getByPlaceholderText('CONFIRMER LE MOT DE PASSE');
        expect(confirmPassword).toBeInTheDocument();
    });
    it('should renders the link to login form and call loginDisplay', () => {
        const { getByText } = render(<Register displayLoginForm={displayLoginForm} displayRegisterForm={displayRegisterForm}/>);
        const link = getByText('Déja inscrit?');
        expect(link).toBeInTheDocument();
        fireEvent.click(link);
        expect(displayLoginForm).toHaveBeenCalled();
        expect(displayRegisterForm).toHaveBeenCalled();
    });
    it('should renders register button', () => {
        const { getByRole } = render(<Register displayLoginForm={displayLoginForm} displayRegisterForm={displayRegisterForm}/>);
        const registerBtn = getByRole('button');
        expect(registerBtn.textContent).toBe("S'INSCRIRE");
    });
});