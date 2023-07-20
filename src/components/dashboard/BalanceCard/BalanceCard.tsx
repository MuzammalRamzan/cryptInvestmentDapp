import { Icon } from "@iconify/react";
import React from "react";
import YPREDLogo from "../YPREDLogo";
import BalanceCardDescription from "./BalanceCardDescription";
import BalanceCardSubTitle from "./BalanceCardSubtitle";
import BalanceCardTitle from "./BalanceCardTitle";

interface IBalanceCardProps {
  children?: React.ReactNode;
}
const BalanceCard = ({ children }: IBalanceCardProps) => {
  return (
    <div className="min-h-[170px] md:min-h-[200px] col-span-1 w-full py-5 md:py-7 px-8 md:px-10 lg:px-12 rounded-md bg-dashboard-light-purple text-white flex flex-row gap-5 items-center justify-between">
      <div className="flex-1">{children}</div>
      {/* <div className="w-14">
        <YPREDLogo width={54} />
      </div> */}
    </div>
  );
};

const BalanceCardWider = ({ children }: IBalanceCardProps) => {
  return (
    <div className="min-h-[200px] col-span-1 lg:col-span-2 w-full py-7 px-12 rounded-md bg-dashboard-light-purple text-white flex flex-row gap-5 items-center justify-between">
      <div className="flex-1">{children}</div>
      {/* <div className="w-14">
        <YPREDLogo width={54} />
      </div> */}
    </div>
  );
};

export default BalanceCard;

BalanceCard.Title = BalanceCardTitle;
BalanceCard.Description = BalanceCardDescription;
BalanceCard.Wider = BalanceCardWider;
BalanceCard.SubTitle = BalanceCardSubTitle;
