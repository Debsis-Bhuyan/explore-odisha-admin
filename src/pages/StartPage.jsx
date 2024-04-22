import React, { useEffect, useState } from "react";

import { Button,  Modal, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Toaster, toast } from "sonner";
import { MdArrowForward } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../store";
import clsx from "clsx";
import NavBar from "../components/NavBar";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import Loading from "../components/Loading";

function StartPage() {
  const { colorScheme } = useMantineColorScheme();
  const theme = colorScheme === "dark";
  const [visible, { toggle }] = useDisclosure(false);
  const { user, signInModel, setSignInModel } = useStore();
  const [opened, { open, close }] = useDisclosure(signInModel);
  const [isSignIn, setIsSignIn] = useState(true);
  const [formClose, setFormClose] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  let from = location?.state?.from?.pathName | "/";
  useEffect(() => {
    user?.token && navigate(from);
  }, [user]);
  const handleCloseModel = () => {
    close();
    setSignInModel(!signInModel);
  };

  return (
    <div
      className={clsx(
        "w-full h-screen px-0 md:px-4",
        theme
          ? "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#302943] via-slate-900 to-black"
          : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#fff] via-blue-50 to-white"
      )}
    >
      <NavBar />
      <div
        className="w-full h-full flex flex-col items-center justify-center md-pt-24
       md:gap-6 px-4"
      >
        <div className="w-full 2xl:max-w-3xl flex flex-col items-center justify-center gap-y-10 2xl:mt-20">
          {/* hidden should delete   */}
          <span
            className={clsx(
              " md:flex gap-1 py-1 px-3  border rounded-full text-sm md:text-base",
              theme
                ? "border-gray-700 text-gray-400 "
                : "border-gray-300 text-gray-600"
            )}
          >
            Unleash your words
            <Link
              className={clsx(
                "flex gap-1 items-center font-semibold text-[18px]",
                theme ? "text-white" : "to-slate-700"
              )}
            >
              Join Now <MdArrowForward />
            </Link>
          </span>
          <h1
            className={clsx(
              "text-4xl 2xl:text-6xl font-bold text-center ",
              theme ? "text-gray-400" : "text-slate-700"
            )}
          >
            Join Our Community of Passionate writers
          </h1>
          <span
            className={clsx(
              "text-base md:text-[18px] text-center ",
              theme ? "text-gray-400" : "text-slate-600"
            )}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
            a, harum autem sit velit odio voluptatem ad facere ratione
            cupiditate itaque ullam! Ullam laborum iure voluptatibus! Facere
            consequatur iusto necessitatibus.
          </span>
          <div className="flex gap-6 items-center mt-6 ">
            <Button
              onClick={open}
              className={clsx(
                "text-white  flex rounded h-10 text-sm",
                theme ? "bg-blue-500" : " bg-black"
              )}
            >
              Get Started
            </Button>
            <Link
              to="#"
              className={clsx(
                "flex gap-2 items-center font-semibold",
                theme ? "text-white" : "text-gray-600"
              )}
            >
              Contact <MdArrowForward />
            </Link>
          </div>
        </div>
      </div>
      <Modal
        opened={opened || signInModel}
        onClose={formClose ? () => {} : handleCloseModel}
        title="User Authenication"
        centered
      >
        {isSignIn ? (
          <>
            <LoginForm
              isSignIn={isSignIn}
              setIsSignIn={setIsSignIn}
              toast={toast}
              toggle={toggle}
              setFormClose={setFormClose}
            />
          </>
        ) : (
          <>
            <SignUpForm
              isSignIn={isSignIn}
              setIsSignIn={setIsSignIn}
              toast={toast}
              toggle={toggle}
              setFormClose={setFormClose}
            />
          </>
        )}
        <Loading visible={visible}/>
        <Toaster richColors/>
      </Modal>
    </div>
  );
}

export default StartPage;
