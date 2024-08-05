import { addProductsType, addProductType, deleteProductType, productsStateType, ProductType, updateProductType } from "../../types";

export const ADD_PRODUCT = 'ADD_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
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
            const newProduct = { ...action.product }
            return { products: [...state.products, newProduct] }
        case DELETE_PRODUCT:
            return { products: state.products.filter((product: ProductType) => product.id !== action.id) }
        case UPDATE_PRODUCT:
            return { products: [...state.products.filter((product: ProductType) => product.id !== action.id), action.PRODUCT] }
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

export const updateProduct = (id: string, product: ProductType): updateProductType => {
    return { type: UPDATE_PRODUCT, id: id, product: product }
}

export const addProducts = (products: ProductType[]): addProductsType => {
    return { type: ADD_PRODUCTS, products: products }
}
