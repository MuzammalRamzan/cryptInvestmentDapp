import { Icon } from "@iconify/react";
import React, { useEffect } from "react";
import { useAppStore } from "@/store";
import clsx from "clsx";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";

interface ConnectWalletInterface {
  bg?: string;
}
const ConnectWallet: React.FC<ConnectWalletInterface> = ({ bg }) => {
  const { address, isDisconnected, isConnected } = useAccount();
  const { setAccount } = useAppStore();
  useEffect(() => {
    if (isConnected) {
      setAccount(address!);
    }
    if (isDisconnected) {
      setAccount(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isDisconnected, isConnected]);

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, address, show }) => {
        return (
          <button
            onClick={show}
            className={clsx(
              "h-12 px-4 text-white flex items-center gap-2 rounded-md text-2xl hover:bg-gray-800",
              bg ? bg : "bg-dashboard-dark-purple"
            )}
          >
            <Icon icon="ph:wallet-fill" />
            <span className="text-base lg:text-lg whitespace-nowrap">
              {isConnected && address
                ? `Disconnect [${address.slice(0, 6)}...${address.slice(-4)}]`
                : "Connect Wallet"}
            </span>
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default ConnectWallet;
