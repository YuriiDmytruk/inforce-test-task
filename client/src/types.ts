export type ProductType = {
    _id: string,
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
    _id: string,
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

export type RootState = {
    products: productsStateType,
    comments: commentsStateType
}

export type addProductType = {
    type: string,
    product: ProductType
}

export type deleteProductType = {
    type: string,
    id: string
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

export type addComentsType = {
    type: string,
    comments: CommentType[]
}

export type StoreType = {

}


