import { produce } from 'immer';
import { ProductModel } from 'models/product.model';
import { getProductsStorage, setProductsStorage } from 'utils/localStorageHelpers';

/** Constants */
const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const CHANGE_THEME = 'CHANGE_THEME';

/** Types */
export type globalState = {
    theme: string;
    language: string;
    cartProducts: ProductModel[];
};

export type actionTypes = {
    type: string;
    payload: any;
};

/** Actions */

export const addProduct = (product: ProductModel) => {
    return {
        type: ADD_PRODUCT,
        payload: product,
    };
};

export const removeProduct = (product: ProductModel) => {
    return {
        type: REMOVE_PRODUCT,
        payload: product,
    };
};

export const changeTheme = (theme: string) => {
    return {
        type: CHANGE_THEME,
        payload: theme,
    };
};

/** Initial State */
export const initialState: globalState = {
    theme: 'dark',
    language: 'en',
    cartProducts: getProductsStorage() || [],
};

/** Reducer*/
export const globalStateReducer = (state = initialState, action: actionTypes): globalState =>
    produce(state, draft => {
        switch (action.type) {
            case ADD_PRODUCT:
                if(!draft.cartProducts.some(product => product.id === action.payload.id)) {
                    draft.cartProducts.push(action.payload);
                }
                setProductsStorage(draft.cartProducts);
                break;
            case REMOVE_PRODUCT:
                draft.cartProducts = draft.cartProducts.filter(product => product.id !== action.payload.id);
                setProductsStorage(draft.cartProducts);
                break;
            case CHANGE_THEME:
                document.body.className = "";
                document.body.classList.add(action.payload);
                draft.theme = action.payload;
                break;
            default:
                return draft;
        }
    });
