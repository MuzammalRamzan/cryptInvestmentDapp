import { useAppStore } from "@/store";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

const BillingTable: React.FC<{ queries: IQuery[] }> = ({ queries }) => {
  const t = useTranslations("BacklinkEstimator");

  return (
    <table className="mt-6 w-full min-w-fit divide-y divide-gray-200 min-h-[5rem] border-collapse border border-[#E8E8FF]">
      <thead className="w-full sticky top-0 z-10">
        <tr>
          {["Transaction ID", "Query ID", "Date", "Invoice"].map(
            (item, index) => (
              <th
                key={index}
                className="w-fit py-3 px-3 text-sm font-medium tracking-wider text-[#333641] whitespace-nowrap text-center border border-[#E8E8FF]"
              >
                {t(item)}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {queries?.map((query, index) => (
          <tr key={index}>
            <td className="py-2 px-3 text-sm text-center font-normal text-gray-700 border border-[#E8E8FF]">
              {query.payment_id || "N/A"}
            </td>
            <td className="py-2 px-3 text-sm text-center font-normal text-gray-700 whitespace-nowrap border border-[#E8E8FF]">
              {query.query_id}
            </td>
            <td className="py-2 px-3 text-sm text-center font-normal text-gray-700 whitespace-nowrap border border-[#E8E8FF]">
              {query.created && new Date(query.created).toDateString()}
            </td>
            <td className="py-2 px-3 text-sm text-center font-normal text-gray-700 whitespace-nowrap border border-[#E8E8FF]"></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BillingTable;
