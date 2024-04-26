import { Table, useMantineColorScheme } from "@mantine/core";
import { useStore } from "../store";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { useContact } from "../hooks/post_hook";
import { Toaster, toast } from "sonner";
import { formatNumber } from "../utils";
import clsx from "clsx";
import { AiOutlineEye } from "react-icons/ai";
import Loading from "../components/Loading";
import moment from "moment";

const Contact = () => {
  const { colorScheme } = useMantineColorScheme();
  const { user } = useStore();
  const [visible, { toggle }] = useDisclosure(false);

  const { data, isPending, mutate } = useContact(toast, toggle, user?.token);

  const theme = colorScheme === "dark";

  const fetchContent = async () => {
    mutate();
  };
  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <p
          className={clsx(
            "text-lg pb-1 font-semibold",
            theme ? "text-white" : "text-black"
          )}
        >
          FeedBack (<span>{data?.contactData?.length + " records "}</span>)
        </p>
        <Table highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>email</Table.Th>
              <Table.Th>feedback</Table.Th>

              <Table.Th>Post Date</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data?.contactData.map((el) => (
              <Table.Tr
                key={el._id}
                className={theme ? "to-gray-400" : "to-slate-600"}
              >
                <Table.Td className="flex gap-2 items-center">
                  <p className="text-base">{el?.name}</p>
                </Table.Td>

                <Table.Td>{el?.email}</Table.Td>

                <Table.Td>
                  <div className="flex gap-1 items-center">
                    <AiOutlineEye size={18} />
                    {formatNumber(el?.desc)}
                  </div>
                </Table.Td>

                <Table.Td>{moment(el?.createdAt).fromNow()}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        <Loading visible={isPending} />
        <Toaster richColors />
      </div>
    </>
  );
};

export default Contact;
