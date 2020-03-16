import React from 'react';
/**Components */
import ProductCard from '../ProductCard';
/**Testing library */
import { render, fireEvent, cleanup } from '@testing-library/react';
import { axe } from 'jest-axe';


type ProductCardProps = {
    image_url: string;
    stock: number;
    productName: string;
    price: number;
    productDescription: string;
    favorite: string;
    onSelected: (e: React.MouseEvent) => void;
    toggleFavorite: (e: React.MouseEvent) => void;
};

const onSelectedMock = jest.fn();
const toggleFavoriteMock = jest.fn();


const renderProductCard = (props: Partial<ProductCardProps> = {}) => {
  const defaultProps: ProductCardProps = {
    onSelected:  onSelectedMock,
    toggleFavorite: toggleFavoriteMock,
    // eslint-disable-next-line @typescript-eslint/camelcase
    image_url: 'https://dummyimage.com/400x400/bc27b5/000&text=Gorgeous Frozen Chair',
    stock: 28,
    productName: 'Gorgeous Frozen Chair',
    price: 47,
    productDescription:
        'Harum modi sunt. Voluptatem ut molestiae consequatur. Ea omnis architecto laboriosam accusantium reiciendis corporis exercitationem ad dolor. Fugit autem placeat voluptas sint aut aliquam sed. Totam fuga nesciunt rerum voluptatibus. Voluptatibus voluptates vel ut et temporibus perferendis laboriosam accusamus.',
    favorite: '1',
  };
  return render(<ProductCard {...defaultProps} {...props} />);
}

describe('<ProductCard>', () => {
    afterEach(() => {
        cleanup();
    });

    test('Snapshot renders => it should rendered with the provided props', () => {
        const { container } = renderProductCard();

        expect(container).toMatchSnapshot();
    });

    test('It should fire toggleFavorite event on click over the heart icon', () => {
        const { getByTestId } = renderProductCard()

        const heartIcon = getByTestId('heart-icon');

        fireEvent.click(heartIcon);

        expect(toggleFavoriteMock).toHaveBeenCalled();
        expect(toggleFavoriteMock).toHaveBeenCalledTimes(1);
    });

    test('It should fire onSelected event on click over add product button', async() => {
        const { findByText } = renderProductCard()

        const addProductButton = await findByText('Add');

        fireEvent.click(addProductButton);

        expect(onSelectedMock).toHaveBeenCalled();
        expect(onSelectedMock).toHaveBeenCalledTimes(1);
    });

    test('should not have basic accessibility issues', async () => {
        const { container } = renderProductCard();
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
