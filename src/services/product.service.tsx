import API from 'utils/api';
import { pageLimit } from 'utils/const';
import { ProductModel } from '../models/product.model';

export const getAllProducts = (pageNumber?: number) => {
    return pageNumber !== undefined
        ? API.get<ProductModel[]>('/grocery', { params: { _page: pageNumber, _limit: pageLimit } })
        : API.get<ProductModel[]>('/grocery');
};

export const getFavoriteProducts = (pageNumber?: number) => {
    return pageNumber !== undefined
        ? API.get<ProductModel[]>('/grocery', { params: { favorite: "1", _page: pageNumber, _limit: pageLimit } })
        : API.get<ProductModel[]>('/grocery', { params: { favorite: "1" } });
};

export const updateItemStock = (product: ProductModel) => {
    return API.patch(`/grocery/${product.id}`, product);
};

export const toogleFavoriteProduct = (product: ProductModel) => {
    return API.patch(`/grocery/${product.id}`, product);
};
