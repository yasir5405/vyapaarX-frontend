import axios from "axios";
import type { ApiResponse, PaginatedResponse } from "./api";
import api from "./api";

export type Products = {
  id: number;
  companyName: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  description: string | null;
  price: number;
  image: string | null;
  isActive: boolean;
  highlights: string[];
};

type getProductsParams = {
  limit?: number;
  cursor?: number;
};

export const getProducts = async ({
  cursor,
  limit,
}: getProductsParams): Promise<PaginatedResponse<Products[]>> => {
  try {
    const res = await api.get(`/products?limit=${limit}&cursor=${cursor}`);
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

export const getProduct = async (
  productId: string,
): Promise<ApiResponse<Products>> => {
  try {
    const res = await api.get(`/products/${productId}`);
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
