import axios from "axios";
import type { ApiResponse } from "./api";
import api from "./api";
import type { Address } from "./auth.api";

export type AddAddressParams = {
  addressLine: string;
  city: string;
  country: string;
  postalCode: string;
  state: string;
};

export const addAddress = async (
  payload: AddAddressParams,
): Promise<ApiResponse<Address>> => {
  try {
    const res = await api.post("/addresses", payload);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return (
        error.response?.data ?? {
          data: null,
          message: "Logout failed",
          success: false,
          error: {
            message: "Server did not respond",
          },
        }
      );
    }

    return {
      data: null,
      message: "Logout failed",
      success: false,
      error: {
        message: "Error logging out. Please try again",
      },
    };
  }
};
