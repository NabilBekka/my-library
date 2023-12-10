import { render } from '@/lib/redux/reduxRender.test';
import '@testing-library/jest-dom';
import ForgotPassword from '.';

describe('Test the ForgotPassword component', () => {
    it('should renders email input', () => {
        const { getByPlaceholderText } = render(<ForgotPassword />);
        const email = getByPlaceholderText('EMAIL');
        expect(email).toBeInTheDocument();
    });
    it('should renders send button', () => {
        const { getByRole } = render(<ForgotPassword />);
        const button = getByRole('button');
        expect(button.textContent).toBe('ENVOYER');
    });
});