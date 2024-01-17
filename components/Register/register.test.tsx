import { fireEvent, render } from '@/lib/redux/reduxRender.test';
import '@testing-library/jest-dom';
import Register from '.';

describe('Test the Register component', () => {
    it('should renders the pseudo input', () => {
        const { getByPlaceholderText } = render(<Register />);
        const email = getByPlaceholderText('PSEUDO');
        expect(email).toBeInTheDocument();
    });
    it('should renders the email input', () => {
        const { getByPlaceholderText } = render(<Register />);
        const email = getByPlaceholderText('EMAIL');
        expect(email).toBeInTheDocument();
    });
    it('should renders the password input', () => {
        const { getByPlaceholderText } = render(<Register />);
        const password = getByPlaceholderText('MOT DE PASSE');
        expect(password).toBeInTheDocument();
    });
    it('should renders the confirm password input', () => {
        const { getByPlaceholderText } = render(<Register />);
        const confirmPassword = getByPlaceholderText('CONFIRMER LE MOT DE PASSE');
        expect(confirmPassword).toBeInTheDocument();
    });
    it('should renders the register button', () => {
        const { getByRole } = render(<Register />);
        const registerBtn = getByRole('button');
        expect(registerBtn.textContent).toBe("S'INSCRIRE");
    });
    it('should check that the register button is not disabled', () => {
        const { getByRole, getByPlaceholderText } = render(<Register />);
        const registerBtn = getByRole('button');
        const pseudo = getByPlaceholderText('PSEUDO');
        const email = getByPlaceholderText('EMAIL');
        const password = getByPlaceholderText('MOT DE PASSE');
        const confirmPassword = getByPlaceholderText('CONFIRMER LE MOT DE PASSE');
        fireEvent.change(pseudo, { target: { value: "john" }});
        fireEvent.change(email, { target: { value: "john@gmail.com" }});
        fireEvent.change(password, { target: { value: "johnPassword" }});
        fireEvent.change(confirmPassword, { target: { value: "johnPassword" }});
        expect(registerBtn).not.toBeDisabled();
    });
});