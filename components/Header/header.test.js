import '@testing-library/jest-dom';
// import { expect, it } from '@jest/globals';
import { fireEvent, render } from '../../lib/redux/reduxRender';
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
});