import { rpcUrl } from "@/config/contract-config";
import { Menu } from "@headlessui/react";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { ethers } from "ethers";
import React, { useEffect, useRef } from "react";
import Tooltip from "../Tooltip";
import { ABI } from "@/abi/ContractABI";
import { useAppStore } from "@/store";
import ConnectWallet from "../ConnectWallet";
import toast from "react-hot-toast";
import YPREDLogo from "../YPREDLogo";
import Link from "next/link";
import useDisclosure from "@/hooks/useDisclosure";

const DappHeader = () => {
  const { currentContract, contractList, setCurrentContract } = useAppStore(
    (state) => state
  );
  const timeLeftCounter = useRef<number>(0);
  const { isOpen, onToggle } = useDisclosure();
  const onCopyAddress = () => {
    const address = currentContract.address;
    if (!address) {
      toast.dismiss();
      return toast.error(
        "Please select a vesting contract from the dropdown to copy its address."
      );
    }
    navigator.clipboard.writeText(`${address}`);
    toast.dismiss();
    toast.success("Copied");
  };

  // get block time stamp
  const getContractEndDate_inSeconds = async () => {
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const contractAddress = currentContract.address;
    const contract = new ethers.Contract(contractAddress, ABI, provider);
    const endDate = (await contract.endDate()).toString();
    const blockNumber = await provider.getBlockNumber();
    const CurrentBlockTimeStamp = (
      await provider.getBlock(blockNumber)
    ).timestamp.toString();
    const timeLeft = parseInt(endDate) - parseInt(CurrentBlockTimeStamp);
    timeLeftCounter.current = timeLeft;
  };
  // console.log(timeLeftCounter);

  const onOpenPolygon = () => {
    const address = currentContract.address;
    if (!address) {
      toast.dismiss();
      return toast.error(
        "Please select a vesting contract to explore on polygonscan.com"
      );
    }
    window.open(
      "https://polygonscan.com/address/" + address,
      "_blank",
      "noopener,noreferrer"
    );
  };
  useEffect(() => {
    if (currentContract.value <= 10) {
      // getContractEndDate_inSeconds();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentContract]);
  return (
    <div className="bg-dashboard-light-purple w-full h-20 md:h-24 sticky top-0 px-8 z-20">
      <div className="flex justify-between items-center h-full">
        <Link href="/" passHref>
          <span className="block md:hidden">
            <YPREDLogo height={40} width={35} />
          </span>
        </Link>
        <button
          onClick={onToggle}
          className="flex md:hidden h-12 px-3 w-fit rounded bg-dashboard-dark-purple text-white items-center text-2xl hover:bg-gray-800"
        >
          <Icon icon={isOpen ? "akar-icons:cross" : "ic:sharp-menu"} />
        </button>
        <div
          className={clsx(
            "fixed md:relative flex flex-1 flex-col h-full w-screen md:w-full bg-dashboard-light-purple  md:bg-transparent md:flex-row items-center justify-start md:justify-end gap-5 px-5 md:px-0 py-10 md:py-0 z-20 md:z-10 top-20 md:top-0 bottom-0 left-0 duration-150",
            isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          )}
        >
          <Menu as="div" className="relative mr-0 w-56 md:w-fit md:mr-12">
            <Menu.Button className="h-12 px-4 py-2 w-full justify-center rounded bg-dashboard-dark-purple text-white flex items-center gap-1 hover:bg-gray-800">
              {currentContract.name}
              <span className="text-white">
                <Icon fontSize={14} icon="ion:caret-down" />
              </span>
            </Menu.Button>
            <Menu.Items
              as="ul"
              className="bg-white absolute mt-1 right-0 flex flex-col min-w-[120px] rounded-sm h-fit z-50"
            >
              {contractList.map((item) => (
                <Menu.Item
                  key={item.value}
                  as="li"
                  className="w-full"
                  onClick={() => setCurrentContract(item)}
                >
                  {({ active }) => (
                    <span
                      className={clsx(
                        "block w-full py-1.5 text-sm text-dashboard-dark-purple cursor-pointer px-3 hover:bg-gray-100",
                        active ? "bg-gray-100" : "bg-white"
                      )}
                    >
                      {item.name}
                    </span>
                  )}
                </Menu.Item>
              ))}
              <Menu.Item
                as="li"
                className="w-full"
                onClick={() =>
                  setCurrentContract({ name: "All", address: "", value: 11 })
                }
                defaultChecked
              >
                {({ active }) => (
                  <span
                    className={clsx(
                      "block w-full py-1.5 text-sm text-dashboard-dark-purple cursor-pointer px-3 hover:bg-gray-100",
                      active ? "bg-gray-100" : "bg-white"
                    )}
                  >
                    All
                  </span>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
          <Tooltip label="Copy">
            <button
              onClick={() => onCopyAddress()}
              className="h-12 px-3 w-56 md:w-fit rounded bg-dashboard-dark-purple text-white flex items-center justify-center text-2xl hover:bg-gray-800"
            >
              <Icon icon="material-symbols:file-copy-outline-rounded" />
            </button>
          </Tooltip>
          <Tooltip label="Open in polygonscan">
            <button
              onClick={() => onOpenPolygon()}
              className="h-12 px-3 w-56 md:w-fit rounded bg-dashboard-dark-purple text-white flex items-center justify-center text-2xl hover:bg-gray-800"
            >
              <Icon icon="ph:arrow-square-out" />
            </button>
          </Tooltip>
          <Tooltip label="Connect wallet">
            <ConnectWallet />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default DappHeader;
