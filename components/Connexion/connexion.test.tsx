import '@testing-library/jest-dom';
import { render } from '../../lib/redux/reduxRender.test';
import Connexion from '.';

describe('Testing the Connexion component', () => {
    it('should renders the login button', () => {
        const { getAllByRole } = render(<Connexion />);
        const loginBtn = getAllByRole('button')[0];
        expect(loginBtn.textContent).toBe('CONNEXION');
    });
    it('should renders the register button', () => {
        const { getAllByRole } = render(<Connexion />);
        const loginBtn = getAllByRole('button')[1];
        expect(loginBtn.textContent).toBe('INSCRIPTION');
    });
});