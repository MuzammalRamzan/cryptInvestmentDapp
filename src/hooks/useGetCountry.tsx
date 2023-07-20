import { countryNameMapper } from "@/utils/countryNameMapper";
import { useEffect, useState } from "react";

const useGetCountry = () => {
  const [country, setCountry] = useState<string>("");
  const fetchCountry = async () => {
    fetch("https://api.country.is/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data: any) => {
        setCountry(() => countryNameMapper[data?.country] || "");
      })
      .catch((e) => {});
  };
  useEffect(() => {
    fetchCountry();
  }, []);
  return { country };
};

export default useGetCountry;
