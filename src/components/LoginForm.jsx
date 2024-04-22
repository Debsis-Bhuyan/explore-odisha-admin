import {
  Button,
  Group,
  PasswordInput,
  TextInput,
  useMantineColorScheme,
} from "@mantine/core";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { useForm } from "@mantine/form";
import { useInputState } from "@mantine/hooks";
import { PasswordStrength } from "./PasswordStrength";
import clsx from "clsx";
import { BiImages } from "react-icons/bi";
import { useLogin } from "../hooks/auth_hooks";
import Loading from "./Loading";
import { Toaster } from "sonner";
const LoginForm = ({ toast, isSignIn, setIsSignIn, toggle, setFormClose }) => {
  const { colorScheme } = useMantineColorScheme();
  const theme = colorScheme === "dark";
  const { signIn } = useStore();
  const { data, isPending, isSuccess, mutate } = useLogin(toast, toggle);
  const [strength, setStrength] = useState(0);
  const [passValue, setPassValue] = useInputState("");
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  const handleSubmit = async (values) => {
    setFormClose(true);
    mutate({ ...values, password: passValue });
    console.log(data);

    if (isSuccess) {
      setFormClose(false);
      console.log(data);
      signIn(data);
    }
  };

  return (
    <div>
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <TextInput
          withAsterisk
          label="Email Address"
          placeholder="abc@gmail.com"
          {...form.getInputProps("email")}
        />

        <PasswordStrength
          value={passValue}
          setValue={setPassValue}
          setStrength={setStrength}
          isSignIn={isSignIn}
        />

        <Group className={clsx("w-full flex justify-between")} mt="md">
          <Button
            className={clsx(theme ? "bg-blue-600" : "bg-black")}
            type="submit"
          >
            Submit
          </Button>
        </Group>

        <p className="text-sm">
          {isSignIn ? "Don't have an account?" : "Already have an account ?"}
          <span
            className="underline text-blue-600 ml-1 cursor-pointer"
            onClick={() => setIsSignIn(!isSignIn)}
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </span>
        </p>
      </form>
      <Loading visible={isPending} />
      <Toaster richColors />
    </div>
  );
};

export default LoginForm;
