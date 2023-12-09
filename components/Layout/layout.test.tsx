import '@testing-library/jest-dom';
import { render } from '../../lib/redux/reduxRender.test';
import Layout from ".";

describe('Testing the Layout component', () => {
    it('should renders the header', () => {
        const { getByRole } = render(<Layout />);
        const header = getByRole('banner');
        expect(header).toBeInTheDocument();    
    });
})