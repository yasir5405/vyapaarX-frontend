import axios from "axios";
import type { ApiResponse, PaginatedResponse } from "./api";
import api from "./api";

export interface Category {
  id: number;
  name: string;
  slug: string;
}

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
  categoryId: number;
  category: Category;
  slug: string;
};

type getProductsParams = {
  limit?: number;
  cursor?: number;
};

export type AddProductParams = {
  name: string;
  description?: string;
  price: number;
  companyName: string;
  highlights: string[];
  categoryId: number;
};

export type UpdateProductParams = {
  productId: number;
  name?: string;
  description?: string;
  price?: number;
  companyName?: string;
  highlights?: string[];
  isActive?: boolean;
  categoryId?: number;
};

export type HomeProducts = {
  categories: Category[];
  newArrivals: Products[];
  menProducts: Products[];
  womenProducts: Products[];
};

export const getProducts = async ({
  cursor,
  limit,
}: getProductsParams): Promise<PaginatedResponse<Products[]>> => {
  try {
    const params = new URLSearchParams();
    if (limit !== undefined) params.append("limit", limit.toString());
    if (cursor !== undefined) params.append("cursor", cursor.toString());

    const res = await api.get(`/products?${params.toString()}`);
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

export const addProduct = async (
  payload: AddProductParams,
): Promise<ApiResponse<Products>> => {
  try {
    const res = await api.post("/products", payload);
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

export const updateProduct = async ({
  productId,
  companyName,
  description,
  highlights,
  name,
  price,
  isActive,
  categoryId,
}: UpdateProductParams): Promise<ApiResponse<Products>> => {
  try {
    const res = await api.put(`/products/${productId}`, {
      name,
      companyName,
      description,
      highlights,
      price,
      isActive,
      categoryId,
    });
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

export const getHomeProducts = async (): Promise<ApiResponse<HomeProducts>> => {
  try {
    const res = await api.get("/products/home");
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
