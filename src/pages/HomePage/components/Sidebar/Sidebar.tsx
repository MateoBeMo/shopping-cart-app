import React from 'react';
import Cart from 'components/Cart';
import { ProductModel } from 'models/product.model';
import { updateItemStock } from 'services/product.service';
import { useStore } from 'store/storeProvider';
import { removeProduct, updateProduct, removeAllProducts } from 'store/globalStore';
import '../../homePage.scss';


type SidebarProps = {
    setRefreshProducts: () => void;
};


const Sidebar = ({setRefreshProducts}: SidebarProps) => {
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
        setRefreshProducts();
    };
    const handleUpdateItem = (product: ProductModel) => {
        dispatch(updateProduct(product));
    };
    return (
        <div className="sidebar__wrapper">
            <div className="sidebar__title">CART</div>
            <Cart products={state.cartProducts} handleRemoveItem={handleRemoveItem} handleCheckout={handleCheckout} handleUpdateItem={handleUpdateItem}></Cart>
        </div>
    );
};

export default Sidebar;
