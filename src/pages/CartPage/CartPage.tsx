import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Cart from 'components/Cart';
import { ProductModel } from 'models/product.model';
import { updateItemStock } from 'services/product.service';
import { useStore } from 'store/storeProvider';
import { removeProduct, updateProduct, removeAllProducts } from 'store/globalStore';
import './cartPage.scss';

const CartPage: React.FC<RouteComponentProps> = () => {
    const { state, dispatch } = useStore();
    const handleRemoveItem = (product: ProductModel) => {
        dispatch(removeProduct(product));
    };
    const handleCheckout = async (products: ProductModel[]) => {
        await Promise.all(
            products.map(product => {
                product.stock -= product.total || 1;
                return updateItemStock(product);
            }),
        );
        dispatch(removeAllProducts());
    };
    const handleUpdateItem = (product: ProductModel) => {
        dispatch(updateProduct(product));
    };
    return (
        <div className="cartPage__wrapper">
            <Cart products={state.cartProducts} handleRemoveItem={handleRemoveItem} handleCheckout={handleCheckout} handleUpdateItem={handleUpdateItem}></Cart>
        </div>
    );
};

export default CartPage;
