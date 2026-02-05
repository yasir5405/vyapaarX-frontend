import axios from "axios";
import api, { type ApiResponse } from "./api";
import type { Products } from "./product.api";

export type CartProduct = Products;

export type CartItem = {
  id: number;
  productId: number;
  cartId: number;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  product: CartProduct;
};

export type Cart = {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  cartItems: CartItem[];
};

export type AddToCartParams = {
  productId: number;
  quantity: number;
};

export type UpdateCartItemParams = {
  productId: number;
  quantity: number;
};

export const addToCart = async (
  payload: AddToCartParams,
): Promise<ApiResponse<null>> => {
  try {
    const res = await api.post("/cart", payload);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return (
        error.response?.data ?? {
          data: null,
          message: "Products fetch failed",
          success: false,
          error: {
            message: "Server did not respond",
          },
        }
      );
    }

    return {
      data: null,
      message: "Register failed",
      success: false,
      error: {
        message: "Error fetching products. Please try again",
      },
    };
  }
};

export const getCart = async (): Promise<ApiResponse<Cart>> => {
  try {
    const res = await api.get("/cart");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return (
        error.response?.data ?? {
          data: null,
          message: "Products fetch failed",
          success: false,
          error: {
            message: "Server did not respond",
          },
        }
      );
    }

    return {
      data: null,
      message: "Register failed",
      success: false,
      error: {
        message: "Error fetching products. Please try again",
      },
    };
  }
};

export const updateCart = async ({
  productId,
  quantity,
}: UpdateCartItemParams): Promise<ApiResponse<null>> => {
  try {
    const res = await api.put(`/cart/items/${productId}`, { quantity });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return (
        error.response?.data ?? {
          data: null,
          message: "Products fetch failed",
          success: false,
          error: {
            message: "Server did not respond",
          },
        }
      );
    }

    return {
      data: null,
      message: "Register failed",
      success: false,
      error: {
        message: "Error fetching products. Please try again",
      },
    };
  }
};
