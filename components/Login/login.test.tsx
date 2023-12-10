import { fireEvent, render } from '@/lib/redux/reduxRender.test';
import '@testing-library/jest-dom';
import Login from '.';

const displayForgotPasswordHandler = jest.fn();
const displayLoginForm = jest.fn();

describe('Test the Login component', () => {
    it('should renders the email input', () => {
        const { getByPlaceholderText } = render(<Login displayLoginForm={displayLoginForm} displayForgotPasswordHandler={displayForgotPasswordHandler}/>);
        const email = getByPlaceholderText('EMAIL');
        expect(email).toBeInTheDocument();
    });
    it('should renders the password input', () => {
        const { getByPlaceholderText } = render(<Login displayLoginForm={displayLoginForm} displayForgotPasswordHandler={displayForgotPasswordHandler}/>);
        const password = getByPlaceholderText('MOT DE PASSE');
        expect(password).toBeInTheDocument();
    });
    it('should renders the link', () => {
        const { getByText } = render(<Login displayLoginForm={displayLoginForm} displayForgotPasswordHandler={displayForgotPasswordHandler}/>);
        const link = getByText('Mot de passe oublié?');
        expect(link).toBeInTheDocument();
    });
    it('should call displayForgotPasswordHandler', () => {
        const { getByText } = render(<Login displayLoginForm={displayLoginForm} displayForgotPasswordHandler={displayForgotPasswordHandler}/>);
        const link = getByText('Mot de passe oublié?');
        fireEvent.click(link);
        expect(displayForgotPasswordHandler).toHaveBeenCalled();
        expect(displayLoginForm).toHaveBeenCalled();
    });
    it('should renders the connect button', () => {
        const { getByRole } = render(<Login displayLoginForm={displayLoginForm} displayForgotPasswordHandler={displayForgotPasswordHandler}/>);
        const button = getByRole('button');
        expect(button.textContent).toBe('SE CONNECTER');
    });
});