import React from 'react';
/**Components */
import DropDown from '../Dropdown';
/**Testing librery */
import { fireEvent, cleanup } from '@testing-library/react';
import { axe } from 'jest-axe';
/**Setup */
import { renderWithReactIntl } from 'setupTests';

const onClick = jest.fn();
const locale = 'es';

const options = [
    {
        value: 'es',
        name: 'app.components.Dropdown.Language.Spanish',
    },
    {
        value: 'en',
        name: 'app.components.Dropdown.Language.English',
    },
];

const selected = 'Español';

describe('<Dropdown>', () => {
    afterEach(() => {
        cleanup();
    });

    test('Snapshot renders => it should rendered with the provided props', () => {
        const { container } = renderWithReactIntl(<DropDown options={options} value={locale} onClick={onClick} />);

        expect(container).toMatchSnapshot();
    });

    test('It should render with the provided props', () => {
        const { getByTestId } = renderWithReactIntl(<DropDown value={locale} options={options} onClick={onClick} />);

        expect(getByTestId('dropdown__selected-test')).toHaveTextContent(selected);
    });

    test('It should render options when click div button', () => {
        const { queryByText, getByTestId } = renderWithReactIntl(
            <DropDown value={locale} options={options} onClick={onClick} />,
        );

        const divButton = getByTestId('dropdown__selected-test');

        expect(queryByText(/Inglés/i)).not.toBeInTheDocument();

        fireEvent.click(divButton);

        expect(queryByText(/Inglés/i)).toBeInTheDocument();
    });

    test('It should call onclick function received by props when click over li element', () => {
        const { queryByText, getByTestId } = renderWithReactIntl(
            <DropDown value={locale} options={options} onClick={onClick} />,
        );

        const divButton = getByTestId('dropdown__selected-test');

        fireEvent.click(divButton);

        const listItem = queryByText(/Inglés/i);

        fireEvent.click(listItem);

        expect(onClick).toHaveBeenCalled();

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    test('Should rendered with no options and with a information message instead', () => {
        const { queryByText, getByTestId } = renderWithReactIntl(
            <DropDown value={'en'} options={null} onClick={onClick} />,
        );
        const divButton = getByTestId('dropdown__selected-test');
        fireEvent.click(divButton);
        expect(queryByText(/la lista está vacía/i)).toBeInTheDocument();
    });

    test("Should rendered with the default value passed by props even if it doesn't match", () => {
        const { getByTestId } = renderWithReactIntl(<DropDown value={'fr'} options={options} onClick={onClick} />);
        expect(getByTestId('dropdown__selected-test')).toHaveTextContent('');
    });

    test('should not have basic accessibility issues', async () => {
        const { container } = renderWithReactIntl(<DropDown value={locale} options={options} onClick={onClick} />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
