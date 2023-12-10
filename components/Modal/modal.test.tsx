import { fireEvent, render } from '@/lib/redux/reduxRender.test';
import '@testing-library/jest-dom';
import Modal from '.';

const display = jest.fn();

describe('Test the Modal component', () => {
    it('should renders the mainDiv', () => {
        const { getByTestId } = render(<Modal display={display}/>);
        const mainDiv = getByTestId('mainDiv');
        expect(mainDiv).toBeInTheDocument();
    });
    it('should renders the exit logo', () => {
        const { getByAltText } = render(<Modal display={display}/>);
        const exitLogo = getByAltText('Fermer');
        expect(exitLogo).toBeInTheDocument();
    });
    it('should call the display function', () => {
        const { getByAltText } = render(<Modal display={display}/>);
        const exitLogo = getByAltText('Fermer');
        fireEvent.click(exitLogo);
        expect(display).toHaveBeenCalled();
    });
});