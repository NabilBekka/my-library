import { render } from '../lib/redux/reduxRender.test';
import Home from './index';
import '@testing-library/jest-dom';

describe('Testing the home page',()=> {
    it('should renders the home page', () => {
        const { getByTestId } = render(<Home />);
        expect(getByTestId('home')).toBeInTheDocument();
    });
})