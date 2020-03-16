import React from 'react';
/**Components */
import Cart from '../Cart';
/**Testing library */
import { render, fireEvent, cleanup } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ProductModel } from 'models/product.model';

type CartProps = {
    products: ProductModel[];
    handleRemoveItem: (product: ProductModel) => void;
    handleCheckout: (products: ProductModel[]) => void;
};

const handleRemoveItemMock = jest.fn();
const handleCheckoutMock = jest.fn();

const renderCart = (props: Partial<CartProps> = {}) => {
    const defaultProps: CartProps = {
        products: [
            {
                id: "c34287bf-9cb7-40a7-ad07-6534e45a6868",
                image_url: 'https://dummyimage.com/400x400/bc27b5/000&text=Gorgeous Frozen Chair',
                stock: 28,
                productName: 'Gorgeous Frozen Chair',
                price: 47,
                productDescription:
                    'Harum modi sunt. Voluptatem ut molestiae consequatur. Ea omnis architecto laboriosam accusantium reiciendis corporis exercitationem ad dolor. Fugit autem placeat voluptas sint aut aliquam sed. Totam fuga nesciunt rerum voluptatibus. Voluptatibus voluptates vel ut et temporibus perferendis laboriosam accusamus.',
                favorite: '1',
            },
            {
                id: "2af15456-ae9e-4c44-a19d-43f852dbb94f",
                image_url: 'https://dummyimage.com/400x400/4b5148/000&text=Gorgeous Rubber Mouse',
                stock: 22,
                productName: 'Gorgeous Rubber Mouse',
                price: 46,
                productDescription:
                    'Eaque voluptas vero magni eum culpa quidem. Dolorum odit atque eaque repudiandae. Occaecati doloribus esse eius et sit iste dignissimos voluptatem. Occaecati commodi eligendi voluptatum. Et iste dolor qui beatae quis ab non. Occaecati saepe praesentium itaque qui soluta asperiores.',
                favorite: '1',
            },
        ],
        handleRemoveItem: handleRemoveItemMock,
        handleCheckout: handleCheckoutMock,
    };
    return render(<Cart {...defaultProps} {...props} />);
};

describe('<Cart>', () => {
    afterEach(() => {
        cleanup();
    });

    test('Snapshot renders => it should rendered with the provided props', () => {
        const { container } = renderCart();

        expect(container).toMatchSnapshot();
    });

    
    test('It should fire handleRemoveItem event on click over minus icon when 1 product left', () => {
        const { getAllByTestId } = renderCart()

        const minusIcons = getAllByTestId('minus-icon');

        fireEvent.click(minusIcons[0]);

        expect(handleRemoveItemMock).toHaveBeenCalled();
        expect(handleRemoveItemMock).toHaveBeenCalledTimes(1);
    });

    test('It should fire handleCheckout event on click over checkout button', async() => {
        const { findByText } = renderCart()

        const checkoutButton = await findByText(/checkout/i);

        fireEvent.click(checkoutButton);

        expect(handleCheckoutMock).toHaveBeenCalled();
        expect(handleCheckoutMock).toHaveBeenCalledTimes(1);
    });

    test('should not have basic accessibility issues', async () => {
        const { container } = renderCart();
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
