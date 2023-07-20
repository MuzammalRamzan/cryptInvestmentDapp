import React, { useEffect, useState } from "react";

const useGetOrders = () => {
  const [orders, setOrders] = useState<OrderInterface[]>([]);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const resetOrders = () => {
    setOrders([]);
    setIsFetched(false);
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchOrders = async (data: Record<string, any>) => {
    setIsLoading(true);
    fetch("https://rensketech.com/api/scrach_cards/filter_orders/", {
      method: "POST",
      body: JSON.stringify(data),
    })
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

  return { orders, fetchOrders, isLoading, resetOrders, isFetched };
};

export default useGetOrders;
