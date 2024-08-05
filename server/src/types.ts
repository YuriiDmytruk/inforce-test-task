export type Product = {
    id: number,
    imageURL: string,
    name: string,
    count: number,
    size: {
        width: number,
        height: number
    },
    weight: number,
    comments: Comment[]
}

export type Comment = {
    id: number,
    productId: number,
    description: string,
    date: string
}