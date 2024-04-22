import React, { useEffect, useState } from "react";

import { Paper, PinInput, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useStore } from "../store";
import clsx from "clsx";
import { useResend, useVerification } from "../hooks/auth_hooks";
import Loading from "../components/Loading";

const OTPVerification = () => {
  const { colorScheme } = useMantineColorScheme();
  const theme = colorScheme === "dark";
  const otpData = JSON.parse(localStorage.getItem("otp_data"));
  const navigate = useNavigate();
  const [visible, { toggle }] = useDisclosure(false);
  const { user } = useStore((state) => state);

  const { mutate, isPending } = useVerification(toast, toggle);
  const resend = useResend(toast, toggle);

  const [seconds, setSeconds] = useState(120);
  const [coundDown, setCountDown] = useState(null);

  if (!otpData?.otpLevel) navigate("/auth");
  if (user?.emailVerified) navigate("/");
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes} :${seconds < 10 ? "0" : ""}${seconds}`;
  };
  useEffect(() => {
    setCountDown(
      setInterval(() => {
        setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000)
    );
    return () => clearInterval(coundDown);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(coundDown);
    }
  }, [seconds, coundDown]);

  const handleSubmit = (val) => {
    console.log(val);
    mutate({ id: otpData.id, otp: val });
  };
  const handleResendOtp = () => {
    resend.mutate(otpData.id);
  };
  return (
    <div
      className={clsx(
        "w-full h-screen flex flex-col items-center justify-center",
        theme
          ? "bg-[radial-gradient(rllipse_at_top,_var(--tw-gradient-stops))] from-[#302943] via-slate-900 to-black"
          : "bg-gray-200"
      )}
    >
      <Paper
        shadow="lg"
        p="xl"
        className={clsx(theme ? "bg-[#0e1627]" : "bg-white")}
      >
        <div className="flex flex-col items-center justify-center mb-6 ">
          <p
            className={clsx(
              "text-2xl font-semibold text-center",
              theme ? "text-gray-400" : "text-slate-700"
            )}
          >
            OTPVerification
          </p>
          <span
            className={clsx(
              "text-sm ",
              theme ? "text-gray-500" : "text-slate-700"
            )}
          >
            Please OTP code send to mail
          </span>
        </div>
        <PinInput
          oneTimeCode
          autoFocus={true}
          type="number"
          length={6}
          size="xl"
          onComplete={(val) => handleSubmit(val)}
        />
        <div className="pt-5 flex items-center justify-center gap-3 text-base">
          {seconds === 0 ? (
            <a
              className="text-base text-blue-600 underline cursor-pointer "
              onClick={() => handleResendOtp()}
            >
              Resend
            </a>
          ) : (
            <>
              {" "}
              <p>OTP will expire in: </p>
              <span className="text-rose-600 font-semibold">
                {formatTime(seconds)}
              </span>
            </>
          )}
        </div>
        <Loading visible={isPending || resend.isPending} />
        <Toaster richColors />
      </Paper>
    </div>
  );
};

export default OTPVerification;
