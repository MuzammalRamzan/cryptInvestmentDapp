import { useAppStore } from "@/store";
import { useEffect, useState } from "react";

const useGetEarnings = () => {
  const [orders, setOrders] = useState<OrderInterface[]>([]);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const { account } = useAppStore();
  const resetOrders = () => {
    setOrders([]);
    setIsFetched(false);
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchOrders = async () => {
    setIsLoading(true);
    fetch(
      `https://rensketech.com/api/scrach_cards/filter_orders_affid/?AFFID=${account}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data: any) => {
        setOrders(() => data?.orders);
      })
      .catch((e) => {})
      .finally(() => {
        setIsLoading(false);
        setIsFetched(true);
      });
  };
  useEffect(() => {
    if (account) {
      fetchOrders();
    } else {
      resetOrders();
    }
  }, [account]);
  return { orders, fetchOrders, isLoading, resetOrders, isFetched };
};

export default useGetEarnings;
