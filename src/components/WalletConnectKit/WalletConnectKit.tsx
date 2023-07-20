import { useAppStore } from "@/store";
import { ConnectKitButton } from "connectkit";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useTranslations } from "next-intl";
import useCreateOrderFinixio from "@/hooks/useCreateOrderFInixio";
import { useRouter } from "next/router";
import clsx from "clsx";
const WalletConnectKit: React.FC<{
  callbackOpen: () => void;
  callbackClose: () => void;
  className?: string;
  showIcon?: boolean;
}> = ({
  callbackClose,
  callbackOpen,
  className = "bg-gradient text-white",
  showIcon = true,
}) => {
  const { setIsAuthenticated } = useAppStore();
  const t = useTranslations("Landing");
  const { address, isDisconnected, isConnected, isConnecting } = useAccount();
  const { setAccount } = useAppStore();
  const [isWalletConnecting, setIsWalletConnecting] = useState<boolean>(false);
  const { createOrderFinixio } = useCreateOrderFinixio();
  const router = useRouter();

  const createLeadSuccess = async () => {
    try {
      (window as any).lintrk("track", { conversion_id: 14229529 });
      (window as any).plausible("wallet-connect");
      const res = await createOrderFinixio({
        walletAddress: address?.toLowerCase(),
        clickId: router.query?.clickId || null,
        iid: process.env.NEXT_PUBLIC_FINIXIO_ID,
        event: "lead_success",
        source: router.query?.source || null,
      });
    } catch (e) {}
  };
  const pushCTAButtonInit = () => {
    (window as any)?.dataLayer.push({
      event: "workflowStep",
      workflowName: "connectWallet",
      workflowStepNumber: 1,
      workflowStepName: "start",
      workflowCompleteFlag: 0,
      workflowErrorCode: "",
    });
  };
  const pushCTAButtonSuccess = (address?: string) => {
    (window as any)?.dataLayer.push({
      event: "workflowStep",
      workflowName: "connectWallet",
      workflowStepNumber: 2,
      workflowStepName: "successful",
      workflowCompleteFlag: 1,
      walletAddress: address,
      workflowErrorCode: "",
    });
  };
  useEffect(() => {
    if (isConnected) {
      setAccount(address!);
      setIsAuthenticated(true);
    }
    if (isDisconnected) {
      setAccount(null);
      setIsAuthenticated(false);
    }
    if (isConnecting) {
      setIsWalletConnecting(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isDisconnected, isConnected, isConnecting]);

  useEffect(() => {
    if (isWalletConnecting && isConnected) {
      callbackOpen();
      createLeadSuccess();
    } else {
      callbackClose();
    }
  }, [isWalletConnecting, isConnected]);

  return (
    <>
      <ConnectKitButton.Custom>
        {({ isConnected, address, show, truncatedAddress }) => {
          return (
            <button
              onClick={() => {
                show && show();
                if (!isConnected) {
                  pushCTAButtonInit();
                } else if (isConnected) {
                  pushCTAButtonSuccess(address);
                }
              }}
              className={clsx(
                "z-20 relative w-full h-11 inline-flex items-center overflow-hidden text-xs font-medium group gap-2 justify-center rounded-full hover:scale-[99.5%]",
                className
              )}
            >
              {!isConnected && showIcon && (
                <Image
                  src={"/img/icon/card.svg"}
                  alt="behance"
                  width={18}
                  height={18}
                />
              )}
              <span className="text-sm">
                {isConnected && address
                  ? t("Disconnect", {
                      address: `[${truncatedAddress}]`,
                    })
                  : t("Connect Wallet")}
              </span>
            </button>
          );
        }}
      </ConnectKitButton.Custom>
    </>
  );
};

export default WalletConnectKit;
