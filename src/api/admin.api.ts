import axios from "axios";
import api, { type ApiResponse } from "./api";

export type AdminOverview = {
  productCount: number;
  orderCount: number;
  userCount: number;
  revenue: number;
  lowStockCount: number;
};

export const getAdminOverview = async (): Promise<
  ApiResponse<AdminOverview>
> => {
  try {
    const res = await api.get("/orders/admin/overview");
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
