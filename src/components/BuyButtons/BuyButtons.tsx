import { CURRENCY_TYPE } from "@/@types/enum";
import { useAppStore } from "@/store";
import { Menu } from "@headlessui/react";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import Image from "next/image";
import React, { ButtonHTMLAttributes, useState } from "react";

export const currencyImageMapper: Record<string, string> = {
  eth: "/img/icon/eth.png",
  bnb: "/img/icon/bnb.png",
  matic: "/img/icon/matic.png",
  card: "/img/icon/card.svg",
  usdt: "/img/icon/usdt.svg",
};

export const currencyDarkImageMapper: Record<string, string> = {
  eth: "/img/icon/eth-dark.svg",
  bnb: "/img/icon/bnb-dark.svg",
  matic: "/img/icon/matic-dark.svg",
  card: "/img/icon/card-dark.svg",
  usdt: "/img/icon/usdt-dark.svg",
};

const BuyButtons: React.FC<{
  currentCurrency: keyof typeof CURRENCY_TYPE;
  setCurrency: React.Dispatch<React.SetStateAction<keyof typeof CURRENCY_TYPE>>;
}> = ({ currentCurrency, setCurrency }) => {
  const [currencies, setCurreicines] = useState<string[]>([
    "eth",
    "matic",
    "card",
    "bnb",
    "usdt",
  ]);
  const moveToThird = (index: number) => {
    const newCurrencies = [...currencies];
    newCurrencies.splice(2, 0, currencies[index]);
    setCurreicines(Array.from(new Set(newCurrencies)));
  };

  return (
    <div className="flex items-center justify-center gap-2 md:gap-3">
      {[...currencies].slice(0, 3).map((currency: string) => (
        <Button
          currency={currency}
          key={currency}
          onClick={() => setCurrency(currency as CURRENCY_TYPE)}
          isActive={currency === currentCurrency}
        >
          {currency}
        </Button>
      ))}
      <Menu as="div" className="relative leading-none">
        <Menu.Button
          as="button"
          className="z-20 relative w-full inline-flex items-center px-2 md:px-3 lg:px-4 py-2 transition-all ease-in duration-75 justify-center p-[1px] overflow-hidden text-xs font-medium  rounded-md group bg-white dark:bg-[#2f32417f] text-darkText dark:text-white border border-skin-pink dark:border-[#ffffff26]"
        >
          More
          <Icon fontSize={16} icon="ic:baseline-more-vert" />
        </Menu.Button>
        <Menu.Items
          as="ul"
          className="bg-gray-50 dark:bg-[#040b28] mt-2 absolute right-0 flex flex-col gap-2 min-w-[150px] py-3 px-4 rounded-md h-fit z-50 shadow-md"
        >
          {[...currencies].slice(3).map((currency: string, index: number) => (
            <Menu.Item
              as="li"
              className="w-full"
              key={currency}
              onClick={(e) => {
                setCurrency(currency as CURRENCY_TYPE);
                moveToThird(index + 3);
              }}
            >
              <Button
                isActive={currency === currentCurrency}
                currency={currency}
              >
                {currency}
              </Button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default BuyButtons;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  currency: string;
}
const Button: React.FC<ButtonProps> = (props) => {
  const { isActive = false, children, currency, ...rest } = props;
  const { theme } = useAppStore();
  return (
    <button
      className={clsx(
        "z-20 relative w-full inline-flex items-center px-2 md:px-3 lg:px-4 py-2 transition-all ease-in duration-75 justify-center overflow-hidden text-xs font-medium  rounded-md group border gap-1",
        isActive
          ? "bg-gradient border-none text-white"
          : theme === "dark"
          ? "bg-[#2f32417f] border-[#ffffff26] text-white"
          : "bg-white border-skin-pink text-darkText"
      )}
      {...rest}
    >
      <Image
        src={
          theme === "dark" || isActive
            ? currencyImageMapper[currency]
            : currencyDarkImageMapper[currency]
        }
        alt="behance"
        width={15}
        height={15}
      />
      <span className="uppercase">{children}</span>
    </button>
  );
};
