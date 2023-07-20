import useContract from "@/hooks/useContract";
import { useAppStore } from "@/store";
import { Icon } from "@iconify/react";
import { useEthers } from "@usedapp/core";

interface IBalanceCardSubTitleProps {
  title: string | number;
  tokenValue: number | string;
  isCalculatingAll: boolean;
}

const BalanceCardSubTitle: React.FC<IBalanceCardSubTitleProps> = ({
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
    <h3 className="font-medium text-lg lg:text-xl">{renderCorrectTitle()}</h3>
  );
};

export default BalanceCardSubTitle;
