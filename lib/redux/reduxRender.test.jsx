import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./store";

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

const Wrapper = ({children}) => {
    return <Provider store={ store }>
        { children }
    </Provider>
};

const customRender = (ui, options) => {
    return render(ui, { wrapper: Wrapper, ...options });
};

test("1 to be equal 1", () => {
    expect(1).toBe(1);
})

export * from '@testing-library/react';

export { customRender as render };