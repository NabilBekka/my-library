import { render } from '../lib/redux/reduxRender';
import Home from '../pages/index';
import '@testing-library/jest-dom';
import { expect, it } from '@jest/globals';

describe('Testing the home page',()=> {
    it('should renders the home page', () => {
        const { getByTestId } = render(<Home />);
        expect(getByTestId('home')).toBeInTheDocument();
    });
})