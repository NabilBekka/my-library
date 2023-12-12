import '@testing-library/jest-dom';
import { fireEvent, render } from '../../lib/redux/reduxRender.test';
import Header from '.';
import mockRouter from 'next-router-mock';

describe('Testing the Header component', () => {
    it('should renders the title', () => {
        const { getByRole } = render(<Header />);
        const title = getByRole('heading');
        expect(title).toHaveTextContent('MY LIBRARY');
    });
    it('should lead back to the home page', () => {
        const { getByRole } = render(<Header />);
        const title = getByRole('heading');
        fireEvent.click(title);
        expect(mockRouter).toMatchObject({
            pathname:"/",
        });
    });
    it('should renders the Connexion Component', () => {
        const { getByTestId } = render(<Header />);
        const title = getByTestId('connexion');
        expect(title).toBeInTheDocument();
    });
    it('should renders the logoParameters', () => {
        const { getByRole } = render(<Header />);
        const logoParameters = getByRole('img');
        expect(logoParameters).toBeInTheDocument();
    });
    it('should renders the Parameters component after clicking on logoParameters, and close it', () => {
        const { getByRole, getByTestId, getAllByText, getByAltText } = render(<Header />);
        const logoParameters = getByRole('img');
        //Test logoParameters clicking
        fireEvent.click(logoParameters);
        const parameters = getByTestId("parametersContainer");
        expect(parameters).toBeInTheDocument();
        fireEvent.click(logoParameters);
        expect(parameters).not.toBeInTheDocument();

        //Test login clicking
        fireEvent.click(logoParameters);
        const login = getAllByText("CONNEXION")[1];
        fireEvent.click(login);
        const loginForm = getByTestId('login');
        expect(loginForm).toBeInTheDocument();
        const exitLogo = getByAltText("Fermer");
        expect(parameters).not.toBeInTheDocument();
        fireEvent.click(exitLogo);
        expect(loginForm).not.toBeInTheDocument();

        //Test register clicking
        fireEvent.click(logoParameters);
        const parameters2 = getByTestId("parametersContainer");
        const register = getAllByText("INSCRIPTION")[1];
        fireEvent.click(register);
        const registerForm = getByTestId('register');
        expect(registerForm).toBeInTheDocument();
        expect(parameters2).not.toBeInTheDocument();
        const exitLogo2 = getByAltText('Fermer');
        fireEvent.click(exitLogo2);
        expect(registerForm).not.toBeInTheDocument();
    });
});