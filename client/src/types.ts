export type ProductType = {
    id: string,
    imageURL: string,
    name: string,
    count: number,
    size: {
        width: number,
        height: number
    },
    weight: number,
    comments: CommentType[]
}

export type CommentType = {
    id: string,
    productId: string,
    description: string,
    date: string
}

export type productsStateType = {
    products: ProductType[]
}

export type commentsStateType = {
    comments: CommentType[]
}

export type addProductType = {
    type: string,
    product: ProductType
}

export type deleteProductType = {
    type: string,
    id: string
}

export type updateProductType = {
    type: string,
    id: string,
    product: ProductType
}

export type addProductsType = {
    type: string,
    products: ProductType[]
}



export type addCommentType = {
    type: string,
    comment: CommentType
}

export type deleteCommentType = {
    type: string,
    id: string
}

export type updateComentType = {
    type: string,
    id: string,
    comment: CommentType
}

export type addComentsType = {
    type: string,
    comments: CommentType[]
}

export type StoreType = {

}


