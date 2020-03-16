import API from 'utils/api';
import { pageLimit } from 'utils/const';
import { ProductModel } from '../models/product.model';

export const getAllProducts = (pageNumber?: number) => {
    const params = pageNumber !== undefined ? { _page: pageNumber, _limit: pageLimit } : {};
    return API.get<ProductModel[]>('/grocery', { params })
};

export const getFavoriteProducts = (pageNumber?: number) => {
    const params = pageNumber !== undefined ? { favorite: "1", _page: pageNumber, _limit: pageLimit } : { favorite: "1" };
    return API.get<ProductModel[]>('/grocery', { params });
};

export const updateItemStock = (product: ProductModel) => {
    return API.patch(`/grocery/${product.id}`, product);
};

export const toogleFavoriteProduct = (product: ProductModel) => {
    return API.patch(`/grocery/${product.id}`, product);
};
