import React, { useEffect, useState } from "react";

const useGetRound = () => {
  const [round, setRound] = useState<IRound>({
    price: 0.07,
    round: 5,
    raised: 50000,
    target: 500000,
    next_price: 0.09,
    percent_increase: 40.0,
    ypred_sum: 0,
  });
  const [isLoadingRound, setIsLoadingRound] = useState<boolean>(false);
  const fetchRound = async () => {
    setIsLoadingRound(true);
    fetch("https://rensketech.com/api/scrach_cards/round/")
      .then((res) => res.json())
      .then(({ data }: { data: IRound }) => {
        setRound(data);
      })
      .catch((e) => {})
      .finally(() => {
        setIsLoadingRound(false);
      });
  };
  useEffect(() => {
    fetchRound();
  }, []);
  return { round, isLoadingRound };
};

export default useGetRound;
