import '@testing-library/jest-dom';
import { fireEvent, render } from '../../lib/redux/reduxRender.test';
import Connexion from '.';

describe('Testing the Connexion component', () => {
    it('should renders the login button', () => {
        const { getAllByRole } = render(<Connexion />);
        const loginBtn = getAllByRole('button')[0];
        expect(loginBtn.textContent).toBe('CONNEXION');
    });
    it('should renders the login form', () => {
        const { getAllByRole, getByTestId } = render(<Connexion />);
        const loginBtn = getAllByRole('button')[0];
        fireEvent.click(loginBtn);
        const form = getByTestId('login');
        expect(form).toBeInTheDocument();
    });
    it('should close the login form', () => {
        const { getAllByRole, getByTestId, getByAltText } = render(<Connexion />);
        const loginBtn = getAllByRole('button')[0];
        fireEvent.click(loginBtn);
        const form = getByTestId('login');
        const exitLogo = getByAltText('Fermer');
        fireEvent.click(exitLogo);
        expect(form).not.toBeInTheDocument();
    });
    it('should renders the register button', () => {
        const { getAllByRole } = render(<Connexion />);
        const registerBtn = getAllByRole('button')[1];
        expect(registerBtn.textContent).toBe('INSCRIPTION');
    });
    it('should renders the register form', () => {
        const { getAllByRole, getByTestId } = render(<Connexion />);
        const registerBtn = getAllByRole('button')[1];
        fireEvent.click(registerBtn);
        const form = getByTestId('register');
        expect(form).toBeInTheDocument();
    });
    it('should renders the login form after clicking on Déja inscrit?', () => {
        const { getAllByRole, getByTestId, getByText } = render(<Connexion />);
        const registerBtn = getAllByRole('button')[1];
        fireEvent.click(registerBtn);
        const register = getByTestId('register');
        const link = getByText("Déja inscrit?");
        fireEvent.click(link);
        const login = getByTestId('login');
        expect(register).not.toBeInTheDocument();
        expect(login).toBeInTheDocument();
    });
    it('should close the register form', () => {
        const { getAllByRole, getByTestId, getByAltText } = render(<Connexion />);
        const registerBtn = getAllByRole('button')[1];
        fireEvent.click(registerBtn);
        const form = getByTestId('register');
        const exitLogo = getByAltText('Fermer');
        fireEvent.click(exitLogo);
        expect(form).not.toBeInTheDocument();
    });
    it('should renders the ForgotPassword component after clicking on Mot de passe oublié?', () => {
        const { getAllByRole, getByText, getByTestId } = render(<Connexion />);
        const loginBtn = getAllByRole('button')[0];
        fireEvent.click(loginBtn);
        const link = getByText('Mot de passe oublié?');
        fireEvent.click(link);
        const forgotPassword = getByTestId('forgotPassword');
        expect(forgotPassword).toBeInTheDocument();
    });
    it('should close the forgotPassword form', () => {
        const { getAllByRole, getByText, getByTestId, getByAltText } = render(<Connexion />);
        const loginBtn = getAllByRole('button')[0];
        fireEvent.click(loginBtn);
        const link = getByText('Mot de passe oublié?');
        fireEvent.click(link);
        const forgotPassword = getByTestId('forgotPassword');
        const exitLogo = getByAltText('Fermer');
        fireEvent.click(exitLogo);
        expect(forgotPassword).not.toBeInTheDocument();
    });
});