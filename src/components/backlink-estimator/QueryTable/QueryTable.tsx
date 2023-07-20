import { useAppStore } from "@/store";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import React, { useMemo, useState } from "react";

const QueryTable: React.FC<{ queries: IQuery[] }> = ({ queries }) => {
  const t = useTranslations("BacklinkEstimator");
  const { setIsStripeModalOpen, setResult } = useAppStore();
  const [activeQuery, setActiveQuery] = useState<IQuery | null>(null);
  const handleResult = (query: IQuery) => {
    if (!query.query_result) return;
    setActiveQuery(query);
    const result = JSON.parse(query.query_result.replaceAll("'", '"'));
    setResult(result);
  };
  const showQueryStatus = (query: IQuery) => {
    if (!query.query_status) return t("N/A");
    else if (query.query_status === "PENDING")
      return (
        <p className="flex gap-1 items-center text-gray-500 text-sm">
          <Icon icon="mdi:clock-outline" />
          <span>{t("Processing")}</span>
        </p>
      );
    else
      return (
        <button
          onClick={() => handleResult(query)}
          className="flex gap-1 items-center text-blue-600 text-sm"
        >
          <Icon icon="grommet-icons:view" />
          <span>{t("View result")}</span>
        </button>
      );
  };

  const handlePaynow = (query: IQuery) => {
    setIsStripeModalOpen(true);
    sessionStorage.setItem("query_id", `${query.query_id}`);
    sessionStorage.setItem("user_search_domain", query.user_search_domain);
    sessionStorage.setItem("user_email", query.user_search_email);
    sessionStorage.setItem("user_search_keyword", query.user_search_keyword);
  };

  return (
    <React.Fragment>
      <table className="mt-6 w-full min-w-fit divide-y divide-gray-200 min-h-[5rem] border-collapse border border-[#E8E8FF]">
        <thead className="w-full sticky top-0 z-10">
          <tr>
            {[
              "Query ID",
              "Keyword",
              "URL",
              "Status",
              "Date",
              "Results",
              "Action",
            ].map((item, index) => (
              <th
                key={index}
                className="w-fit py-3 px-3 text-sm font-medium tracking-wider text-[#333641] whitespace-nowrap text-center border border-[#E8E8FF]"
              >
                {t(item)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {queries?.map((query, index) => (
            <tr
              key={index}
              className={clsx(
                query.query_id === activeQuery?.query_id &&
                  "bg-[#dcf9e8] sticky top-0"
              )}
            >
              <td className="py-2 px-3 text-sm text-center font-normal text-gray-700 border border-[#E8E8FF]">
                {query.query_id}
              </td>
              <td className="py-2 px-3 text-sm text-center font-normal text-gray-700 whitespace-nowrap border border-[#E8E8FF]">
                {query.user_search_keyword}
              </td>
              <td className="py-2 px-3 text-sm text-center font-normal text-gray-700 whitespace-nowrap border border-[#E8E8FF]">
                {query.user_search_domain}
              </td>
              <td className="py-2 px-3 text-sm text-center font-normal text-gray-700 whitespace-nowrap border border-[#E8E8FF]">
                {query.query_status || "N/A"}
              </td>
              <td className="py-2 px-3 text-sm text-center font-normal text-gray-700 border border-[#E8E8FF]">
                {new Date(query.created).toDateString()}
              </td>
              <td className="py-2 px-3 text-sm text-center font-normal text-gray-700 whitespace-nowrap border border-[#E8E8FF]">
                {showQueryStatus(query)}
              </td>
              <td className="py-2 px-3 text-sm text-center font-normal text-gray-700 whitespace-nowrap border border-[#E8E8FF] w-fit">
                {["NA", "COMPLETED"].includes(
                  query.payment_status || ""
                ) ? null : (
                  <div className="flex justify-center items-center">
                    <button
                      className={clsx(
                        "outline-none border-none flex justify-center items-center rounded-md h-[32px] px-4 text-sm font-medium w-fit disabled:cursor-not-allowed bg-[#D03A9D] text-white"
                      )}
                      onClick={() => handlePaynow(query)}
                    >
                      {t("Pay now")}
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default QueryTable;
