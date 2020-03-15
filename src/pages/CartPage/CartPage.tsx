import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Cart from 'components/Cart';
import { ProductModel, CartProductModel } from 'models/product.model';
import { updateItemStock } from 'services/product.service';
import { useStore } from 'store/storeProvider';
import { removeProduct } from 'store/globalSlider';
import './cartPage.scss';

const CartPage: React.FC<RouteComponentProps> = () => {
    const { state, dispatch } = useStore();
    const handleRemoveItem = (product: ProductModel) => {
        dispatch(removeProduct(product));
    };
    const handleCheckout = (products: CartProductModel[]) => {
        products.forEach((product) => {
            product.stock -= product.total;
            delete product.total;
            updateItemStock(product);
        })
    };
    return (
        <div className="cartPage__wrapper">
            <Cart products={state.cartProducts} handleRemoveItem={handleRemoveItem} handleCheckout={handleCheckout}></Cart>
        </div>
    );
};

export default CartPage;
