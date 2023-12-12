import { fireEvent, render } from '@/lib/redux/reduxRender.test';
import '@testing-library/jest-dom';
import Parameters from '.';

describe('Test the Parameters component', () => {
    it('should renders the divs (login, register and darkMode)', () => {
        const { getByText } = render(<Parameters />);
        const login = getByText("CONNEXION");
        const register = getByText("INSCRIPTION");
        const darkMode = getByText("MODE SOMBRE");
        expect(login).toBeInTheDocument();
        expect(register).toBeInTheDocument();
        expect(darkMode).toBeInTheDocument();
    });
    it('should renders the ToggleMode component', () => {
        const { getByText, getByTestId } = render(<Parameters />);
        const darkMode = getByText("MODE SOMBRE");
        fireEvent.click(darkMode);
        const toggleMode = getByTestId('toggleMode');
        expect(toggleMode).toBeInTheDocument();
    });
});