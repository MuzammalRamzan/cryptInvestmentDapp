import { useState } from "react";

interface IGetFinixioAffiliateResponse {
  statusCode: number;
  data: {
    url: string;
  };
}

const useGetFinixioAffiliate = () => {
  const [affiliate, setAffiliate] = useState<string>("");
  const getFinixioAffiliate = async (data: Record<string, any>) => {
    fetch(`${process.env.NEXT_PUBLIC_FINIXIO_API_URL}/api/publisher/presale`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_FINIXIO_SECRET}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data: IGetFinixioAffiliateResponse) => setAffiliate(data.data.url))
      .catch((e) => setAffiliate(""));
  };

  return { affiliate, getFinixioAffiliate };
};

export default useGetFinixioAffiliate;
