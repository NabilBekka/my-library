import { fireEvent, render } from '@/lib/redux/reduxRender.test';
import '@testing-library/jest-dom';
import Login from '.';

const displayForgotPasswordHandler = jest.fn();
const displayLoginForm = jest.fn();

describe('Test the Login component', () => {
    it('should renders the email input', () => {
        const { getByPlaceholderText } = render(<Login />);
        const email = getByPlaceholderText('EMAIL');
        expect(email).toBeInTheDocument();
    });
    it('should renders the password input', () => {
        const { getByPlaceholderText } = render(<Login />);
        const password = getByPlaceholderText('MOT DE PASSE');
        expect(password).toBeInTheDocument();
    });
    it('should renders the link', () => {
        const { getByText } = render(<Login />);
        const link = getByText('Mot de passe oublié?');
        expect(link).toBeInTheDocument();
    });
    it('should renders the connect button', () => {
        const { getByRole } = render(<Login />);
        const button = getByRole('button');
        expect(button.textContent).toBe('SE CONNECTER');
        expect(button).toBeDisabled();
    });
    it('should renders the connect button', () => {
        const { getByRole, getByPlaceholderText } = render(<Login />);
        const button = getByRole('button');
        const email = getByPlaceholderText('EMAIL');
        const password = getByPlaceholderText('MOT DE PASSE');
        fireEvent.change(email, { target: { value: 'john@gmail.com' }});
        fireEvent.change(password, { target: { value: 'johnPassword' }});
        expect(button).not.toBeDisabled();
    });
});