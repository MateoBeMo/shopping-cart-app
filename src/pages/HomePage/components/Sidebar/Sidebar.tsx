import React from 'react';
import Cart from 'components/Cart';
import { ProductModel, CartProductModel } from 'models/product.model';
import { updateItemStock } from 'services/product.service';
import { useStore } from 'store/storeProvider';
import { removeProduct } from 'store/globalSlider';
import { removeProductsStorage } from 'utils/localStorageHelpers';
import '../../homePage.scss';


type SidebarProps = {
    setRefreshProducts: () => void;
};


const Sidebar = ({setRefreshProducts}: SidebarProps) => {
    const { state, dispatch } = useStore();
    const handleRemoveItem = (product: ProductModel) => {
        dispatch(removeProduct(product));
    };
    const handleCheckout = async (products: CartProductModel[]) => {
        await Promise.all(
            products.map(product => {
                product.stock -= product.total;
                delete product.total;
                return updateItemStock(product);
            }),
        );
        removeProductsStorage();
        setRefreshProducts();
    };
    return (
        <div className="sidebar__wrapper">
            <div className="sidebar__title">CART</div>
            <Cart products={state.cartProducts} handleRemoveItem={handleRemoveItem} handleCheckout={handleCheckout}></Cart>
        </div>
    );
};

export default Sidebar;
