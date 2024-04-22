import { create } from "zustand";

const useStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  isOTPLevel: false,
  otpData: JSON.parse(localStorage.getItem("otp_data")),
  signInModel: false,

  signIn: (data) => set((state) => ({ user: data })),
  setOtp: (val) => set((state) => ({ isOTPLevel: val })),
  signOut: (data) => set((state) => ({ user: {} })),
  setSignInModel: (val) => set((state) => ({ signInModel: val })),
}));
export { useStore };
