import api from "@/api/axios";

export interface AddToCartPayload {
    productId: string;
    quantity: number;
}

export interface UpdateCartPayload {
    quantity: number;
}

export const getCart = async () => {
    const response = await api.get("/cart");

    return response.data.data;
};

export const addToCart = async (
    payload: AddToCartPayload,
) => {
    const response = await api.post("/cart", payload);

    return response.data.data;
};

export const updateCartItem = async (
    productId: string,
    quantity: number,
) => {
    const response = await api.put(
        `/cart/${productId}`,
        { quantity },
    );

    return response.data.data;
};

export const removeFromCart = async (
    productId: string,
) => {
    const response = await api.delete(
        `/cart/${productId}`,
    );

    return response.data.data;
};