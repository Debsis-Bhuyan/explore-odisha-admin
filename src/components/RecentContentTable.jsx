import { Table } from "@mantine/core";
import React from "react";
import { formatNumber, getInitials } from "../utils";
import { FaMonument } from "react-icons/fa";
import moment from "moment";

const RecentContentTable = ({ data, theme }) => {
  const tableData = data?.map((el) => (
    <Table.Tr
      key={el._id}
      className={theme ? "text-gray-400" : "text-slate-700"}
    >
      <Table.Td className="flex gap-2 items-center ">
        {
          <img
            src={el?.img}
            alt={el?.title}
            className="w-10 h-10 rounded-full object-cover"
          />
        }
        <>
          <p className="text-base">{el?.title}</p>
          <span className="text-sm text-rose-600">{el?.cat}</span>
        </>
      </Table.Td>
      <Table.Td>{formatNumber(el?.views.length)}</Table.Td>
      <Table.Td>{moment(el?.createdAt).fromNow()}</Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      <Table highlightOnHover withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Post Title</Table.Th>
            <Table.Th>Views</Table.Th>
            <Table.Th>Post date</Table.Th>
          </Table.Tr>
        </Table.Thead>
        {data?.length === 0 && <Table.Caption>No Data Found.</Table.Caption>}
        <Table.Tbody>{tableData}</Table.Tbody>
      </Table>
    </>
  );
};
export default RecentContentTable;
