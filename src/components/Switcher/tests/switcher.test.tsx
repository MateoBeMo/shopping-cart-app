import React, { ChangeEvent } from 'react';
/**Components */
import Switcher from '../Switcher';
/**Testing library */
import { render, fireEvent, cleanup } from '@testing-library/react';
import { axe } from 'jest-axe';

const onChangeMock = jest.fn();

type SwitcherProps = {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
    switcherName: string;
};

const renderSwitcher = (props: Partial<SwitcherProps> = {}) => {
    const defaultProps: SwitcherProps = {
        onChange: onChangeMock,
        checked: true,
        switcherName: 'switcher-test',
    };
    return render(<Switcher {...defaultProps} {...props} />);
};

describe('<Switcher>', () => {
    afterEach(() => {
        cleanup();
    });

    test('Snapshot renders => it should rendered with the provided props', () => {
        const { container } = renderSwitcher();

        expect(container).toMatchSnapshot();
    });

    test('It should fire onChange event on click over element', () => {
        const { getByTestId } = renderSwitcher();

        const inputCheckbox = getByTestId('switcher__input__checkbox-test');

        fireEvent.click(inputCheckbox);

        expect(onChangeMock).toHaveBeenCalled();
        expect(onChangeMock).toHaveBeenCalledTimes(1);
    });

    test('It should get checked prop', () => {
        const { getByTestId } = renderSwitcher();

        const checkbox = getByTestId('switcher__input__checkbox-test');

        expect(checkbox).toHaveAttribute('checked', '');
    });

    test('should not have basic accessibility issues', async () => {
        const { container } = renderSwitcher();
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
