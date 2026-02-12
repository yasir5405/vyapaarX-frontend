import axios from "axios";
import type { ApiResponse } from "./api";
import api from "./api";
import type { Products } from "./product.api";

export type OrderItem = {
  id: number;
  createdAt: string;
  productId: number;
  quantity: number;
  price: number;
  orderId: number;
  productName: string;
  product: Products;
};

export type Order = {
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  addressId: number | null;
  addressSnapShot: {
    addressLine: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  totalAmount: number;
  status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  razorpaySignature: string | null;
  orderItems: OrderItem[];
};

export type CreatedOrderResponse = {
  orderId: number;
  razorpayOrderId: string;
  amount: number | string;
  currency: string;
};

export type OrderResponse = {
  orders: Order[];
  totalOrders: number;
};

export type CreateOrderParams = {
  addressId: number;
};

export type getOrderParams = {
  orderId: number;
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

export const createOrder = async (
  payload: CreateOrderParams,
): Promise<ApiResponse<CreatedOrderResponse>> => {
  try {
    const res = await api.post("/orders", payload);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return (
        error.response?.data ?? {
          data: null,
          message: "Order creation failed",
          success: false,
          error: {
            message: "Server did not respond",
          },
        }
      );
    }

    return {
      data: null,
      message: "Order creation failed",
      success: false,
      error: {
        message: "Unknown error",
      },
    };
  }
};

export const getOrders = async (): Promise<ApiResponse<Order[]>> => {
  try {
    const res = await api.get(`/orders`);
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

export const getOrder = async ({
  orderId,
}: getOrderParams): Promise<ApiResponse<Order>> => {
  try {
    const res = await api.get(`/orders/${orderId}`);
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
