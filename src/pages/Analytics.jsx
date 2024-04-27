import { Toaster, toast } from "sonner";
import Loading from "../components/Loading";
import { Select, useMantineColorScheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useAnalytics } from "../hooks/post_hook";
import { useStore } from "../store";
import clsx from "clsx";
import Stats from "../components/Stats";
import Graph from "../components/Graph";

const Analytics = () => {
  const { user } = useStore();
  const { colorScheme } = useMantineColorScheme();
  const [numOfDays, setNumOfDays] = useState(28);
  const [visible, { toggle }] = useDisclosure(false);
  const { data, isPending, mutate } = useAnalytics(toast, toggle, user?.token);
  const theme = colorScheme === "dark";
  useEffect(() => {
    mutate(numOfDays);
  }, [numOfDays]);
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between mb-3">
        <p
          className={clsx(
            "text-xl font-semibold",
            theme ? "text-white" : "text-slate-700"
          )}
        >
          Analytics
        </p>
        <Select
          label="Search"
          defaultValue="28 days"
          placeholder="Range"
          data={["7 days", "28 days", "90 days", "365 days"]}
          onChange={(val) => setNumOfDays(val?.split(" ")[0])}
        />
      </div>

      <Stats dt={data} />
      <div className="w-full py-8">
        <p className="py-5 text-base font-medium">
          View Stats for last {numOfDays} days
        </p>
        <Graph dt={data?.viewStats} />
      </div>
      <div className="w-full py-8">
        <p className="py-5 text-base font-medium">
          Followers Stats for last {numOfDays} days
        </p>
        <Graph dt={data?.followersStats} />
      </div>

      <Loading visible={isPending} />
      <Toaster richColors />
    </div>
  );
};

export default Analytics;
