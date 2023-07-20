import { encipher } from "./crypto";

export const getAffiliateLink = (address: string) => {
  return `ypredict.ai/?affID=${encipher(address)}`;
};
