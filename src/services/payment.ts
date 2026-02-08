import type { ApiResponse } from "@/api/api";
import api from "@/api/api";
import axios from "axios";

export type VerifyPaymentPayload = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export const verifyPayment = async (
  payload: VerifyPaymentPayload,
): Promise<ApiResponse<null>> => {
  try {
    const res = await api.post("/orders/verify-payment", payload);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return (
        error.response?.data ?? {
          data: null,
          message: "Order verification failed",
          success: false,
          error: {
            message: "Server did not respond",
          },
        }
      );
    }

    return {
      data: null,
      message: "Order verification failed",
      success: false,
      error: {
        message: "Unknown error",
      },
    };
  }
};
