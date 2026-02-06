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

export type Address = {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  userId: number;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

export type User = {
  name: string;
  email: string;
  role: "Admin" | "User";
  createdAt: Date;
  updatedAt: Date;
  id: number;
  addresses?: Address[];
};

export type ResetPasswordParams = {
  email: string;
};

export type ResetPasswordChangeParams = {
  password: string;
  confirmPassword: string;
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

export const getMe = async (): Promise<ApiResponse<User>> => {
  try {
    const res = await api.get("/auth/me");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return (
        error.response?.data ?? {
          data: null,
          message: "User data fetching failed",
          success: false,
          error: {
            message: "Server did not respond",
          },
        }
      );
    }

    return {
      data: null,
      message: "User data fetching failed",
      success: false,
      error: {
        message: "Error fetching user data. Please try again",
      },
    };
  }
};

export const logoutUser = async (): Promise<ApiResponse<null>> => {
  try {
    const res = await api.post("/auth/logout");
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

export const forgotPassword = async (
  payload: ResetPasswordParams,
): Promise<ApiResponse<null>> => {
  try {
    const res = await api.post("/auth/forgot-password", payload);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return (
        error.response?.data ?? {
          data: null,
          message: "Password reset failed",
          success: false,
          error: {
            message: "Server did not respond",
          },
        }
      );
    }

    return {
      data: null,
      message: "Password reset",
      success: false,
      error: {
        message: "Error sending password reset link. Please try again",
      },
    };
  }
};

export const resetPassword = async (
  payload: ResetPasswordChangeParams,
  token: string,
): Promise<ApiResponse<null>> => {
  if (!token) {
    return {
      data: null,
      success: false,
      message: "Invalid or expired reset token",
      error: {
        message: "Reset token is missing",
      },
    };
  }
  try {
    const res = await api.post(`/auth/reset-password?token=${token}`, payload);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return (
        error.response?.data ?? {
          data: null,
          message: "Password reset failed",
          success: false,
          error: {
            message: "Server did not respond",
          },
        }
      );
    }

    return {
      data: null,
      message: "Password reset",
      success: false,
      error: {
        message: "Error sending password reset link. Please try again",
      },
    };
  }
};
