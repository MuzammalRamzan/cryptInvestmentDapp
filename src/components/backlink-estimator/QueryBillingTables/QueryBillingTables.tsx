import useFilterBacklinkSearchQueries from "@/hooks/useFilterBacklinkSearchQueries";
import { useAppStore } from "@/store";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import React, { useEffect, useMemo, useState } from "react";
import BillingTable from "../BillingTable";
import QueryTable from "../QueryTable";

const QueryBillingTables = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setProfile, setIsAuthenticated } = useAppStore();
  const t = useTranslations("BacklinkEstimator");
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });
  const { page, limit } = pagination;
  const [currentTable, setCurrentTable] = useState<"query" | "billing">(
    "query"
  );

  const { isAuthenticated, account, profile, refetchQuery, setRefetchQuery } =
    useAppStore();
  const handleLogout = () => {
    setProfile(null);
    if (!account) {
      setIsAuthenticated(false);
    }
    setProfile(null);
    localStorage.removeItem("user");
  };
  const [queries, setQueries] = useState<IQuery[]>([]);
  // console.log(queries);
  const { filterSearchQuery } = useFilterBacklinkSearchQueries();
  const fetchSearchQuery = async () => {
    if (!profile && !account) return;
    try {
      setIsLoading(true);
      const res = await filterSearchQuery({
        ...(profile && profile.email && { email: profile?.email }),
        ...(account && { from: account?.toLowerCase() }),
      });
      setQueries(res.queries || []);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };
  const skip = (page - 1) * limit;

  const queriesToShow = useMemo(() => {
    if (!queries || !queries.length) return [] as IQuery[];
    return queries.slice(skip, skip + limit);
  }, [skip, page, limit, queries]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchSearchQuery();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setPagination({ page: 1, limit: 5 });
  }, [currentTable]);
  useEffect(() => {
    if (refetchQuery) {
      fetchSearchQuery();
      setRefetchQuery(false);
    }
  }, [refetchQuery]);

  useEffect(() => {
    if (profile && !profile.email && !account) {
      handleLogout();
    }
  }, [profile, account]);
  return (
    <div
      className="mt-10 shadow-md p-8 mb-7"
      style={{
        boxShadow: "0px 4px 53px 0px rgba(170, 170, 170, 0.25)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button
            onClick={() => currentTable !== "query" && setCurrentTable("query")}
            className={clsx(
              "outline-none border-none flex justify-center bg-[#F7F7F7] text-[#333641] items-center rounded-md h-[44px] px-3 text-sm font-medium w-fit hover:bg-gradient-to-r hover:from-[#D03A9D] hover:to-[#D03A9D] disabled:cursor-not-allowed hover:text-white",
              currentTable === "query" &&
                "bg-gradient-to-r from-[#D03A9D] to-[#8540D5] text-white"
            )}
          >
            {t("My queries")}
          </button>
          <button
            onClick={() =>
              currentTable !== "billing" && setCurrentTable("billing")
            }
            className={clsx(
              "outline-none border-none flex justify-center bg-[#F7F7F7] text-[#333641] items-center rounded-md h-[44px] px-3 text-sm font-medium w-fit hover:bg-gradient-to-r hover:from-[#D03A9D] hover:to-[#D03A9D] disabled:cursor-not-allowed hover:text-white",
              currentTable === "billing" &&
                "bg-gradient-to-r from-[#D03A9D] to-[#8540D5] text-white"
            )}
          >
            {t("Billing")}
          </button>
        </div>
        {profile && (
          <button
            onClick={() => handleLogout()}
            className="outline-none border-none flex justify-center items-center font-bold text-[#333641] text-sm"
          >
            {t("Logout")}
          </button>
        )}
      </div>
      {currentTable === "query" && <QueryTable queries={queriesToShow} />}
      {currentTable === "billing" && <BillingTable queries={queriesToShow} />}
      {isLoading && (
        <div className="flex justify-center pt-3 pb-2 w-full">
          <span className="w-5">
            <Icon
              icon="svg-spinners:6-dots-rotate"
              fontSize={20}
              color="black"
            />
          </span>
        </div>
      )}
      {queriesToShow && queriesToShow.length > 0 && (
        <div className="flex justify-between mt-8 items-center">
          <p className="text-sm">
            {t("showingResult", {
              start: skip + 1,
              end:
                page * limit > queries.length ? queries.length : page * limit,
              total: queries.length,
            })}
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={page === 1 || !queriesToShow.length}
              onClick={() =>
                setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
              }
              className={clsx(
                "outline-none flex gap-1 justify-center items-center rounded-md h-[32px] px-4 text-sm font-medium w-fit disabled:cursor-not-allowed border border-skin-pink text-skin-pink disabled:border-gray-400 disabled:text-gray-400"
              )}
            >
              {t("Prev")}
            </button>
            <button
              disabled={queriesToShow.length < limit || !queriesToShow.length}
              onClick={() =>
                setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
              }
              className={clsx(
                "outline-none flex gap-1 justify-center items-center rounded-md h-[32px] px-4 text-sm font-medium w-fit disabled:cursor-not-allowed border border-skin-pink text-skin-pink disabled:border-gray-400 disabled:text-gray-400"
              )}
            >
              {t("Next")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryBillingTables;
