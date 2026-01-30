import axios from "axios";
import type { ApiResponse } from "./api";
import api from "./api";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginSuccessData = {
  accessToken: string;
};

export const register = async (
  payload: RegisterPayload,
): Promise<ApiResponse<null>> => {
  try {
    const response = await api.post("/auth/register", payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return (
        error.response?.data ?? {
          data: null,
          message: "Register failed",
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
        message: "Error signing up. Please try again",
      },
    };
  }
};

export const login = async (
  payload: LoginPayload,
): Promise<ApiResponse<LoginSuccessData>> => {
  try {
    const response = await api.post("/auth/login", payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return (
        error.response?.data ?? {
          data: null,
          message: "Login failed",
          success: false,
          error: {
            message: "Server did not respond",
          },
        }
      );
    }

    return {
      data: null,
      message: "Login failed",
      success: false,
      error: {
        message: "Error logging in. Please try again",
      },
    };
  }
};
