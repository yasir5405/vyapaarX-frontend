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

export type UpdateAddressParams = {
  addressLine?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  state?: string;
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

export const updateAddress = async (
  payload: UpdateAddressParams,
  addressId: number,
): Promise<ApiResponse<null>> => {
  try {
    const res = await api.put(`/addresses/${addressId}`, payload);
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

export const updateDefaultAddress = async (
  addressId: number,
): Promise<ApiResponse<null>> => {
  try {
    const res = await api.patch(`/addresses/${addressId}/default`);
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

export const deleteAddress = async (
  addressId: number,
): Promise<ApiResponse<null>> => {
  try {
    const res = await api.delete(`/addresses/${addressId}`);
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
