import useGetOrders from "@/hooks/useGetOrders";
import React, { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Web3 from "web3";
import OrdersTable from "../OrdersTable";

interface ModalAllocationStatusProps {
  isOpen: boolean;
  onClose: () => void;
}

type FilterType = "email" | "from";
const ModalAllocationStatus: React.FC<ModalAllocationStatusProps> = ({
  isOpen,
  onClose,
}) => {
  const [type, setType] = useState<FilterType>();
  const [value, setValue] = useState<string>("");
  const { fetchOrders, orders, resetOrders, isLoading, isFetched } =
    useGetOrders();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!type) return toast.error("Please choose email or address");
    try {
      let data = { [type as string]: value };
      await fetchOrders(data);
    } catch (e) {}
  };
  useEffect(() => {
    if (!isOpen) {
      setValue("");
      resetOrders();
    }
  }, [isOpen]);
  return isOpen ? (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none px-3 sm:px-0">
      <div
        className="absolute top-0 right-0 left-0 bottom-0 bg-neutral-900 opacity-25"
        onClick={onClose}
      ></div>
      <div className="relative w-auto my-0 md:my-6 mx-auto max-w-3xl md:max-w-full">
        <div className="absolute z-10 right-2 md:px-1 top-1 items-stretch px-0 py-1 text-black-500 font-bold uppercase outline-1 text-lg">
          <button
            className="float-right align-right px-1 md:px-3 text-2xl"
            type="button"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div className="max-h-screen w-[98vw] md:w-[90vw] lg:w-[80vw] xl:w-[70vw] min-h-[15rem] relative border-0 rounded-2xl shadow-lg flex flex-col justify-between bg-white outline-none focus:outline-none overflow-y-auto overflow-x-hidden text-sm lg-text-lg py-4 pt-0 px-6 md:px-10 ">
          <div
            className="w-[100%] h-[6px] bg-black self-center rounded-xl mb-2"
            style={{
              background:
                "radial-gradient(circle at top left, #f03985, #5144f8)",
            }}
          />
          <div className="flex-1 w-full h-fit mt-4">
            <h3 className="text-center font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#FF387A]  via-[#A63EBA]  to-[#4845FF]">
              Check allocation status by wallet address / email
            </h3>

            <div className="w-full max-w-[350px] mx-auto mt-[24px] mb-[32px]">
              <form onSubmit={handleSubmit}>
                <select
                  value={type}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setType(e.target.value as FilterType)
                  }
                  className={`border p-2 rounded-xl w-full outline-0 text-sm text-center placeholder-gray-400 ${
                    type ? "text-gray-600" : "gray-400"
                  }`}
                >
                  <option value="">Choose type</option>
                  <option value="email">Email</option>
                  <option value="from">Address</option>
                </select>
                <input
                  value={value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setValue(e.target.value)
                  }
                  className="mt-4 border p-2 rounded-xl w-full outline-0 text-sm text-center text-gray-600 placeholder-gray-400"
                  placeholder="Wallet address or email"
                />
                <button
                  onClick={() => {}}
                  type="submit"
                  disabled={
                    isLoading ||
                    !type ||
                    !value ||
                    (type === "from" && !Web3.utils.isAddress(value)) ||
                    (type === "email" &&
                      !value.match(
                        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                      ))
                  }
                  className="flex disabled:opacity-60 mt-4 flex-row justify-center items-center btn-grad-1 mb-4 self-center w-full text-center"
                  // className="mt-4 py-2 relative z-20 w-full inline-flex items-center justify-center overflow-hidden text-sm font-medium  rounded-xl group bg-gradient-to-br from-[#6042ef] to-skin-pink hover:from-skin-pink hover:to-[#6042ef] disabled:from-skin-pink disabled:to-skin-pink disabled:opacity-50 text-white disabled:cursor-not-allowed"
                >
                  {isLoading && (
                    <img className="w-5 h-5" src="img/icon/img-loading.gif" />
                  )}
                  Check status
                </button>
              </form>
            </div>
            {orders?.length > 0 && (
              <div className="mt-4 w-full overflow-auto pb-4 max-h-[500px]">
                <OrdersTable orders={orders} />
              </div>
            )}
            {isFetched && orders.length === 0 && (
              <p className="text-center text-gray-600 text-sm">
                No orders found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default ModalAllocationStatus;
