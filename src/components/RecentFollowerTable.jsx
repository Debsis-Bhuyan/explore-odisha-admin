import { Table } from "@mantine/core";
import React from "react";
import { formatNumber, getInitials } from "../utils";
import { FaMonument } from "react-icons/fa";
import moment from "moment";
const RecentFollowerTable = ({ data, theme }) => {
  const tableData = data?.map(({ _id, createdAt, followerId: follower }) => (
    <Table key={_id} className={theme ? "text-gray-400" : "text-white"}>
      <Table.Td className="flex gap-2 items-center ">
        {follower?.image ? (
          <img
            src={follower.image}
            alt={follower.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <>
            <p className="w-10 h-10 rounded-full justify-center items-center first:bg-blue-700 text-white">
              {getInitials(follower.name)}
            </p>
          </>
        )}
        <>
          <p className="text-base">{follower.name}</p>
          <div className="flex gap-3 items-center">
            <span className="text-sm text-rose-600">
              {follower.accountType}
            </span>
            {follower.followers.length > 0 && (
              <span className="text-sm to-slate-600 font-bold">
                {formatNumber(follower.followers.length)}
              </span>
            )}
          </div>
        </>
      </Table.Td>
      <Table.Td>{moment(createdAt).fromNow()}</Table.Td>
    </Table>
  ));

  return (
    <>
      <Table highlightOnHover withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Follower</Table.Th>
            <Table.Th>Join date</Table.Th>
          </Table.Tr>
        </Table.Thead>
        {data?.length === 0 && <Table.Caption>No Data Found.</Table.Caption>}
        {/* <Table.Tbody>{tableData}</Table.Tbody> */}
      </Table>
    </>
  );
};

export default RecentFollowerTable;
