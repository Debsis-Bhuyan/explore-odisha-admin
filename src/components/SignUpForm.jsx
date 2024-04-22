import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { useForm } from "@mantine/form";
import { useInputState } from "@mantine/hooks";
import { PasswordStrength } from "./PasswordStrength";
import clsx from "clsx";

import { Button, Group, TextInput, useMantineColorScheme } from "@mantine/core";
import { BiImages } from "react-icons/bi";
import { uploadFile } from "../utils";
import { useSignUp } from "../hooks/auth_hooks";
import { Toaster } from "sonner";
import Loading from "./Loading";

const SignUpForm = ({ toast, isSignIn, setIsSignIn, toggle, setFormClose }) => {
  const { colorScheme } = useMantineColorScheme();
  const theme = colorScheme === "dark";
  const { signIn } = useStore();

  const [strength, setStrength] = useState(0);
  const [fileUrl, setFileUrl] = useState("");
  const [file, setFile] = useState("");
  const [passValue, setPassValue] = useInputState("");
  const navigate = useNavigate();
  const { data, isPending, mutate,  } = useSignUp(toast, toggle);

  const form = useForm({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
    },
    validate: {
      firstName: (value) =>
        value.length < 3 ? "First Name is too Short" : null,
      lastName: (value) =>
        value.length < 3 ? "First Name is too Short" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  const handleSubmit = (value) => {
    console.log(value);
    console.log(passValue);

    if (!isSignIn && strength < 90) return;
    console.log("hello");

    setFormClose(true);
    const res = mutate({
      ...value,
      password: passValue,
      image: fileUrl,
      accountType: "Writer",
    });
  };

  useEffect(() => {
    file && uploadFile(setFileUrl, file);
  }, [file]);
  return (
    <div>
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="flex flex-col gap-3"
      >
        <div className="w-full flex gap-2">
          <TextInput
            withAsterisk
            label="First Name "
            placeholder="First Name"
            {...form.getInputProps("firstName")}
          />
          <TextInput
            withAsterisk
            label="Last Name"
            placeholder="Last Name"
            {...form.getInputProps("lastName")}
          />
        </div>
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
          isSignIn={false}
        />

        <Group className="w-full flex justify-between" mt="md">
          <div className="flex flex-col items-center justify-between">
            <label
              htmlFor="imgUpload"
              className={clsx(
                "flex items-center gap-1 text-base cursor-pointer",
                theme ? "text-gray-500" : "text-gray-700"
              )}
            >
              <input
                type="file"
                id="imgUpload"
                data-max-size={5120}
                accept=".jpg, .png, .jpeg"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <BiImages />
              <span>Picture</span>
            </label>
          </div>
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

export default SignUpForm;
