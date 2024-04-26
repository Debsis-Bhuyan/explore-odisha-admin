import {
  IconUser,
  IconDeviceDesktopAnalytics,
  IconGauge,
  IconCalendarStats,
  IconSettings,
  IconAddressBook
} from "@tabler/icons-react";
import {
  ActionIcon,
  Stack,
  Tooltip,
  rem,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { BsPencilSquare } from "react-icons/bs";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";

const mockdata = [
  { icon: IconGauge, label: "Dashboard", to: "dashboard" },

  { icon: IconDeviceDesktopAnalytics, label: "Analytics", to: "analytics" },

  { icon: IconCalendarStats, label: "Content", to: "contents" },

  { icon: IconUser, label: "Followers", to: "followers" },
  { icon: BsPencilSquare, label: "Create Post", to: "write" },

  { icon: IconAddressBook, label: "Feedback",to:"feedback"  },
];
const NavbarLink = ({ icon: Icon, label, active, onClick }) => {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={clsx(
          "flex items-center gap-2 px-4 py-1.5 rounded-full",
          active ? "bg-black text-white" : ""
        )}
        data-active={active || undefined}
      >
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
        {label}
      </UnstyledButton>
    </Tooltip>
  );
};
const SideBar = ({ close = () => {} }) => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.slice(1);
  const handleClick = (to) => {
    close();
   
    navigate(`${to}`);
  };
  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={index}
      active={link.to === path}
      onClick={() => handleClick(link.to)}
    />
  ));
  return (
    <>
      <nav className=" h-full flex flex-col gap-5 py-4 mx-4 border-t border-slate-700 px-6 2xl:px-14">
        <p className="py-2">Menu</p>

        <Stack justify="center" gap={10}>
          {links}
        </Stack>
        <ActionIcon
          onClick={()=>setColorScheme(colorScheme === "light" ? "dark" : "light")}
          variant="default"
          size="xl"
          aria-label="Toggle color scheme"
          className="w-full rounded-full mt-18"
        >
          {colorScheme === "dark" ? (
            <IconSun stroke={0.5} />
          ) : (
            <IconMoon stroke={0.5} />
          )}
        </ActionIcon>
      </nav>
    </>
  );
};

export default SideBar;
