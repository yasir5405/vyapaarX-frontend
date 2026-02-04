import axios from "axios";
import type { ApiResponse } from "./api";
import api from "./api";

export type Order = {
  addressId: number | null;
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  addressSnapShot: {
    addressLine: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  totalAmount: number;
  status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  user: {
    id: number;
    email: string;
    name?: string | null;
  };
};

export type OrderResponse = {
  orders: Order[];
  totalOrders: number;
};

export const getAllOrders = async (): Promise<ApiResponse<OrderResponse>> => {
  try {
    const res = await api.get(`/orders/admin`);
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
