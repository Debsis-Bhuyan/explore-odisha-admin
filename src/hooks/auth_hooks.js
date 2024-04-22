import { useMutation } from "@tanstack/react-query";
import { API_URL } from "../utils/index";
import axios from "axios";
export const useSignUp = (toast, toggle) => {
  return useMutation({
    mutationFn: async (formData) => {
      toggle();
      const { data } = await axios.post(`${API_URL}/auth/register`, formData);
      console.log(data);
      return data;
    },
    onError: (error, data) => {
      toggle();
      toast.error(error?.response?.data?.message ?? error?.message);
    },
    onSuccess: (data) => {
      toggle();
      console.log(data);
      toast.success(data?.message);

      localStorage.setItem(
        "otp_data",
        JSON.stringify({
          otpLevel: true,
          id: data.user._id,
        })
      );
      setTimeout(() => {
        window.location.replace("/otp-verification");
      }, 1000);
    },
  });
};
export const useLogin = (toast, toggle) => {
  return useMutation({
    mutationFn: async (formData) => {
      toggle();
      const { data } = await axios.post(`${API_URL}/auth/login`, formData);
      localStorage.setItem("user", JSON.stringify(data));
      
      return data;
    },
    onError: (error, data) => {
      toggle();
      toast.error(error?.response?.data?.message ?? error?.message);
    },
    onSuccess: (data) => {
      toggle();
      console.log(data);
      toast.success(data?.message);

      // localStorage.setItem(
      //   "otp_data",
      //   JSON.stringify({
      //     otpLevel: true,
      //     id: data.user._id,
      //   })
      // );
      setTimeout(() => {
        window.location.replace("/");
      }, 1000);
    },
  });
};

export const useResend = (toast, toggle) => {
  return useMutation({
    mutationFn: async (id) => {
      toggle();
      const { data } = await axios.post(`${API_URL}/users/resend-link/${id}`);
      return data;
    },
    onError: (error, data) => {
      toggle();
      toast.error(error?.response?.data?.message ?? error.message);
    },
    onSuccess: (data) => {
      toggle();

      toast.success(data?.message);

      localStorage.setItem(
        "otp_data",
        JSON.stringify({
          otpLevel: true,
          id: data.user._id,
        })
      );
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
  });
};
export const useVerification = (toast, toggle) => {
  return useMutation({
    mutationFn: async ({ id, otp }) => {
      toggle();
      const { data } = await axios.post(`${API_URL}/users/verify/${id}/${otp}`);
      console.log(data)
      return data;
    },
    onError: (error, data) => {
      toast.error(error?.response?.data?.message ?? error.message);
    },
    onSuccess: (data) => {
      toast.success(data?.message);

      setTimeout(() => {
        localStorage.removeItem("otp_data");
        window.location.replace("/auth");
      }, 1000);
    },
  });
};
