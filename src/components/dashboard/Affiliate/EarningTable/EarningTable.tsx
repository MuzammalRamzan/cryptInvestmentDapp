import useGetEarnings from "@/hooks/useGetEarnings";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import React from "react";

const StatusMapper: Record<string, any> = {
  PE: "Pending",
  AL: "Success",
  PA: "Success",
  UP: "Pending",
};
const EarningTable = () => {
  const { orders, isLoading } = useGetEarnings();
  const headings = ["Date", "Sale", "Currency", "Commission", "Status"];
  return (
    <table className="w-full min-w-fit divide-y divide-gray-200">
      <thead className="bg-gray-100 w-full sticky top-0 z-10">
        <tr>
          {headings.map((item, index) => (
            <th
              key={index}
              className="w-fit py-3 px-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 whitespace-nowrap"
            >
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {orders?.map((order, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td className="py-3 px-3 text-sm font-normal text-gray-700">
              {`${new Date(order.datetime).toLocaleDateString()}, ${new Date(
                order.datetime
              ).toLocaleTimeString()}`}
            </td>
            <td className="py-3 px-3 text-sm font-normal text-gray-700 whitespace-nowrap">
              {order.value}
            </td>
            <td className="py-3 px-3 text-sm font-normal text-gray-700 whitespace-nowrap">
              {order.currency}
            </td>
            <td className="py-3 px-3 text-sm font-normal text-gray-700 whitespace-nowrap">
              {Number(0.05 * +order?.value).toFixed(3)}
            </td>
            <td
              className={clsx(
                "py-3 px-3 text-sm font-normal",
                StatusMapper[order?.status] === "Success"
                  ? "text-green-700"
                  : "text-red-500"
              )}
            >
              {StatusMapper[order?.status]}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        {isLoading && (
          <div className="flex items-center gap-2 text-white whitespace-nowrap">
            <Icon icon="eos-icons:three-dots-loading" width="58" />
            Getting your affiliate earnings...
          </div>
        )}
      </tfoot>
    </table>
  );
};

export default EarningTable;
