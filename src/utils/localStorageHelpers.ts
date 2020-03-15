import { ProductModel } from 'models/product.model';

export const setUserStorage = (userName: string) => {
    localStorage.setItem('userName', userName);
};

export const removeUserStorage = () => {
    localStorage.removeItem('userName');
};

export const setProductsStorage = (products: ProductModel[]): void => {
    const productsToString = JSON.stringify(products);
    localStorage.setItem('products', productsToString);
};

const localStorageHasItem = (key: string) => {
    return localStorage.getItem(key) !== null;
}

export const getProductsStorage = (): [] => {
    if (localStorageHasItem('products')) {
        const products = localStorage.getItem('products') || '';
        return JSON.parse(products);
    }
    return [];
};


export const removeProductsStorage = (): void => {
    if (localStorageHasItem('products')) {
        localStorage.removeItem('products');
    }
};
