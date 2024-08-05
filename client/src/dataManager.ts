import { ProductType } from "./types";

export const getAllProducts = async () => {
    try {
        const response = await fetch('http://localhost:5000/products');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error; // or handle the error in some way
    }
};

export const addProductDB = async (product: ProductType) => {
    try {
        const response = await fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product), // Convert the product object to a JSON string
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error; // or handle the error in some way
    }
};

export const deleteProductDB = async (productId: string) => {
    try {
        const response = await fetch(`http://localhost:5000/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.product._id;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error; // or handle the error in some way
    }
};