import {
  Button,
  Drawer,
  Menu,
  rem,
  useMantineColorScheme,
} from "@mantine/core";
import React from "react";
import { useStore } from "../store";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";

import {
  FaFacebook,
  FaInstagram,
  FaLongArrowAltRight,
  FaUser,
  FaYoutube,
} from "react-icons/fa";
import Logo from "./Logo";
import clsx from "clsx";
import { IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import SideBar from "./SideBar";

const MobileDrawer = ({ theme }) => {
  const { user } = useStore();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <SideBar close={close} />
        <div className="w-full mt-10">
          <UserMenu user={user?.user} theme={theme} />
        </div>
        <Button
          onClick={open}
          className={theme ? "text-white" : "text-slate-800"}
        >
          <BiMenu className="text-xl" />
        </Button>
      </Drawer>
      <Button className={theme ?"text-white":"text-slate-600"}  onClick={open} >
        <BiMenu className="text-xl"/>
      </Button>
    </>
  );
};

const UserMenu = ({ user, theme }) => {
  const { signOut } = useStore();

  const handleSignOut = () => {
    localStorage.removeItem("user");
    signOut();
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button
          className={`${
            theme ? "text-gray-400" : "text-black"
          } flex items-center `}
        >
          <img
            src={user?.image}
            alt="profile image"
            className="w-8 rounded-full"
          />
          <div className=" flex flex-col items-start ml-1">
            <p className="font-medium ">{user?.name}</p>
            <span className="text-sm font-normal">{user?.accountType}</span>
          </div>
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item
          left={<FaUser style={{ width: rem(14), height: rem(14) }} />}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          leftSection={
            <AiOutlineLogout style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={() => {
            handleSignOut();
          }}
        >
          Logout
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label>Danger Zone</Menu.Label>
        <Menu.Item
          leftSection={
            <IconTrash style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={() => {}}
        >
          Delete Account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

const NavBar = () => {
  const { colorScheme } = useMantineColorScheme();
  const { user, signInModel, setSignInModel } = useStore();
  const location = useLocation();
  const theme = colorScheme === "dark";
  const handleLogin = () => {
    location.pathname === "/auth" && setSignInModel(!signInModel);
  };

  return (
    <div className="w-full flex fixed top-0 z-50 bg-transparent flex-row px-4 md:px-6 py-4 md:py-5 items-center justify-between gap-4 shadow">
      {user && (
        <div className="block lg:hidden">
          <MobileDrawer theme={theme} />
        </div>
      )}
      
      <Logo type="signin" />
      <div className="flex gap-14  items-center">
        <div className="flex gap-2 items-center">
          {user?.token ? (
           
              <UserMenu user={user?.user} theme={theme} />
          
          ) : (
            <Link
              to={"/auth"}
              className={clsx(
                "flex items-center gap-2 rounded-full 2xl:mr-10 text-base",
                theme ? "text-white" : "text-black"
              )}
              // here check theme is true or not that affexct login color 
              onClick={handleLogin}
            >
              <span>Login</span>
              <FaLongArrowAltRight />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
