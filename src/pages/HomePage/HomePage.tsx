import React, { useState }  from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ProductList from './components/ProductList/ProductList';
import Sidebar from './components/Sidebar';
import { useStore } from 'store/storeProvider';
import { addProduct } from 'store/globalStore';
import { ProductModel } from 'models/product.model';

const HomePage: React.FC<RouteComponentProps> = () => {
    const [resfreshProducts, setRefreshProducts] = useState<boolean>(false);
    const { dispatch } = useStore();

    const handleSelected = (product: ProductModel) => {
        dispatch(addProduct(product));
    }

    return (
        <div className="homePage__wrapper">
            <ProductList handleSelected={handleSelected} resfreshProducts={resfreshProducts}></ProductList>
            <Sidebar  setRefreshProducts={() =>setRefreshProducts(!resfreshProducts)}/>
        </div>
    );
};

export default HomePage;
