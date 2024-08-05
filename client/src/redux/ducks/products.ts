import { addProductDB } from "../../dataManager";
import { addProductsType, addProductType, deleteProductType, productsStateType, ProductType } from "../../types";

export const ADD_PRODUCT = 'ADD_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const ADD_PRODUCTS = 'ADD_PRODUCTS'

const defaultState: productsStateType = {
    products: []
};

export const productsReducer = (
    state: productsStateType = defaultState,
    action: any
): productsStateType => {
    switch (action.type) {
        case ADD_PRODUCT:
            return { products: [...state.products, action.product] }
        case DELETE_PRODUCT:
            return { products: state.products.filter((product: ProductType) => product._id !== action.id) }
        case ADD_PRODUCTS:
            return { products: [...state.products, ...action.products] }
        default:
            return state;
    }
};

export const addProduct = (product: ProductType): addProductType => {
    return { type: ADD_PRODUCT, product: product }
}
export const deleteProduct = (id: string): deleteProductType => {
    return { type: DELETE_PRODUCT, id: id }
}

export const addProducts = (products: ProductType[]): addProductsType => {
    return { type: ADD_PRODUCTS, products: products }
}
