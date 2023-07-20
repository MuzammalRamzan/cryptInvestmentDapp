import { Icon } from "@iconify/react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React from "react";

interface ModalInsufficientTokenProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalInsufficientToken: React.FC<ModalInsufficientTokenProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const t = useTranslations("Landing");
  return isOpen ? (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none px-3 sm:px-0">
      <div
        className="absolute top-0 right-0 left-0 bottom-0 bg-neutral-900 opacity-25"
        onClick={onClose}
      ></div>
      <div className="relative w-auto my-0 md:my-6 mx-auto max-w-3xl md:max-w-full">
        <div className="absolute z-10 right-2 md:px-1 top-1 items-stretch px-0 py-2 text-black-500 font-bold uppercase outline-1 text-lg">
          <button
            className="float-right align-right px-1 md:px-3 text-2xl hover:text-red-600"
            type="button"
            onClick={onClose}
          >
            <Icon icon="ic:outline-cancel" />
          </button>
        </div>
        <div className="max-h-screen w-[95vw] md:w-[90vw] lg:w-[60vw] xl:w-[40vw] min-h-[15rem] relative border-0 rounded-2xl shadow-lg flex flex-col justify-between bg-white outline-none focus:outline-none overflow-y-auto overflow-x-hidden text-sm lg-text-lg py-4 pt-0 px-6 md:px-10 ">
          <div
            className="w-[100%] h-[6px] bg-black self-center rounded-xl mb-2"
            style={{
              background:
                "radial-gradient(circle at top left, #f03985, #5144f8)",
            }}
          />
          <div className="flex-1 w-full h-fit mt-4">
            <div className="w-full  mt-[24px] mb-[32px]">
              <p>
                {t(
                  "Your query cannot be processed as your balance is below 5555 YPREDs You must participate in presale and purchase a minimum of 5555 YPREDs in order to use models in yPredict ecosystem This model would still be free to use and your YPRED tokens will not get debited unless otherwise specified in future You must maintain 5555 YPREDs to continue to use yPredict Backlink Calculator model"
                )}
              </p>
              <div className="mt-8 flex gap-10 items-center justify-end">
                <button
                  onClick={() => onClose()}
                  className="relative items-center overflow-hidden text-md font-medium text-red-500"
                >
                  {t("cancel")}
                </button>
                <button
                  className="relative px-6 h-11 inline-flex items-center overflow-hidden text-md font-medium group gap-2 justify-center rounded-full hover:scale-[99.5%] bg-gradient text-white"
                  onClick={() => {
                    router.push("/");
                    onClose();
                  }}
                >
                  {t("Buy YPREDs")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default ModalInsufficientToken;
