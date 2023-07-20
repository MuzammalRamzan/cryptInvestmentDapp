import useContract from "@/hooks/useContract";
import { useAppStore } from "@/store";
import { Icon } from "@iconify/react";
import { useEthers } from "@usedapp/core";

interface IBalanceCardTitleProps {
  title: string | number;
  tokenValue: number | string;
  isCalculatingAll: boolean;
}

const BalanceCardTitle: React.FC<IBalanceCardTitleProps> = ({
  title,
  tokenValue,
  isCalculatingAll,
}) => {
  const { account } = useAppStore();
  const renderCorrectTitle = () => {
    if (account) {
      if (isCalculatingAll)
        return <Icon icon="eos-icons:three-dots-loading" width="58" />;
      else return tokenValue;
    } else {
      return title;
    }
  };
  return (
    <h3 className="font-medium text-xl lg:text-2xl">{renderCorrectTitle()}</h3>
  );
};

export default BalanceCardTitle;
