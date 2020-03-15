import React from 'react';
/**Components */
import Switcher from '../Switcher';
/**Testing library */
import { render, fireEvent, cleanup } from '@testing-library/react';
import { axe } from 'jest-axe';

const checked = true;
const onChange = jest.fn();
const switcherName = 'switcher-test';

describe('<Switcher>', () => {
    afterEach(() => {
        cleanup();
    });

    test('Snapshot renders => it should rendered with the provided props', () => {
        const { container } = render(<Switcher onChange={onChange} checked={checked} switcherName={switcherName} />);

        expect(container).toMatchSnapshot();
    });

    test('It should fire onChange event on click over element', () => {
        const { getByTestId } = render(<Switcher onChange={onChange} checked={checked} switcherName={switcherName} />);

        const inputCheckbox = getByTestId('switcher__input__checkbox-test');

        fireEvent.click(inputCheckbox);

        expect(onChange).toHaveBeenCalled();
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    test('It should get checked prop', () => {
        const { getByTestId } = render(<Switcher onChange={onChange} checked={checked} switcherName={switcherName} />);

        const checkbox = getByTestId('switcher__input__checkbox-test');

        expect(checkbox.checked).toEqual(true);
    });

    test('should not have basic accessibility issues', async () => {
        const { container } = render(<Switcher onChange={onChange} checked={checked} switcherName={switcherName} />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
