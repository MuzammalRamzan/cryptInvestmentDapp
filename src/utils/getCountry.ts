import { regionToCountry } from "./region-to-country";

export const getCountry = () => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  //   console.log("country", regionToCountry[timeZone], regionToCountry);
  return regionToCountry[timeZone] || "";
};
