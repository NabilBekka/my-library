import { render } from '../lib/redux/reduxRender.test';
import Home from '../pages/index';
import '@testing-library/jest-dom';

describe('Testing the home page',()=> {
    it('should renders the home page', () => {
        render(<Home />);
    });
})