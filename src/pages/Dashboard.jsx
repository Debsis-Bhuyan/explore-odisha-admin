import clsx from "clsx";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { useMantineColorScheme } from "@mantine/core";
import { useStore } from "../store";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { useAnalytics } from "../hooks/post_hook";
import { toast, Toaster } from "sonner";
import Stats from "../components/Stats";
import Graph from "../components/Graph";
import RecentFollowerTable from "../components/RecentFollowerTable";
import RecentContentTable from "../components/RecentContentTable";
import Loading from "../components/Loading";
const Dashboard = () => {
  const { colorScheme } = useMantineColorScheme();
  const theme = colorScheme === "dark";
  const { user } = useStore();
  const [visible, { toggle }] = useDisclosure();
  const { data, isPending, mutate } = useAnalytics(toast, toggle, user?.token);
  useEffect(() => {
    mutate();
  }, []);

  return (
    <div className="w-full">
      <Stats dt={data} />
      
      <div className="flex gap-6 flex-col md:flex-row py-6">
        
        {/* recent contents  */}
        <div className="w-full md:w-2/3 flex flex-col ">
          <span
            className={clsx(
              "py-5 text-base font-medium",
              theme ? "text-white" : "text-slate-600"
            )}
          >
            Recent 5 contents
          </span>
          <RecentContentTable data={data?.last5Posts} theme={theme} />
        </div>
      </div>
      {/* loading functionality not done yet  */}
      <Loading visible={isPending} />
      <Toaster richColors />
    </div>
  );
};

export default Dashboard;
