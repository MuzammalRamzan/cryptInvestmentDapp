import React, { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ModalRequestAllocationProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderInterface;
}
const ModalRequestAllocation: React.FC<ModalRequestAllocationProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  const [from, setFrom] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const onRequest = () => {
    fetch(`https://rensketech.com/api/scrach_cards/email/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        walletAdress: order.address,
        from,
        email,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result?.response === "success") {
            toast.success(
              "Allocation requested, It takes upto 12 hours for team to verify & allocate tokens to your provided wallet",
              { duration: 5000 }
            );
            onClose();
          } else {
            toast.error("Error! Please Try Again.");
          }
        },
        (error) => {
          toast.error("Error! Please Try Again.");
        }
      );
  };
  useEffect(() => {
    setEmail(order.email);
    setFrom(order._from);
  }, [order]);
  return isOpen ? (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none px-3 sm:px-0">
      <div
        className="absolute top-0 right-0 left-0 bottom-0 bg-neutral-900 opacity-40"
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
        <div className="max-h-screen w-[95vw] md:w-[80vw] lg:w-[60vw] xl:w-[40vw] min-h-[15rem] relative border-0 rounded-2xl shadow-lg flex flex-col justify-between bg-white outline-none focus:outline-none overflow-y-auto overflow-x-hidden text-sm lg-text-lg py-4 pt-0 px-6 md:px-10 ">
          <div
            className="w-[100%] h-[6px] bg-black self-center rounded-xl mb-2"
            style={{
              background:
                "radial-gradient(circle at top left, #f03985, #5144f8)",
            }}
          />
          <div className="flex-1 w-full h-fit mt-4">
            <h3 className="text-center font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#FF387A]  via-[#A63EBA]  to-[#4845FF]">
              Please confirm the address to which you would like to allocate
              your tokens
            </h3>
            <div className="flex flex-col items-center mt-[24px]">
              <div className="w-full max-w-[350px]">
                <div className="flex items-center space-x-1 border p-2 rounded-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 417.6 417.6"
                  >
                    <g>
                      <g>
                        <g>
                          <path
                            fill="#E53B8E"
                            d="M409.6,154.6c-5.2-4.8-12-8-19.6-8c0.4,0,0.8,0,1.2,0v-41.2c0-16.8-6.8-32-18-43.2c-11.2-11.2-26.4-18-43.2-18H61.2
				c-16.8,0-32,6.8-43.2,18C6.8,73.4,0,88.6,0,105.4v206.8c0,16.8,6.8,32,18,43.2s26.4,18,43.2,18H330c16.8,0,32-6.8,43.2-18
				s18-26.4,18-43.2v-41.6c-0.4,0-0.8,0-1.2,0c7.6,0,14.4-3.2,19.6-8c4.8-4.8,8-12,8-19.6v-68.8
				C417.6,166.6,414.4,159.8,409.6,154.6z M369.2,311.8c0,10.8-4.4,20.4-11.6,27.6S340.8,351,330,351H61.2
				c-10.8,0-20.4-4.4-27.6-11.6c-7.2-7.2-11.6-16.8-11.6-27.6V105.4c0-10.8,4.4-20.4,11.6-27.6c7.2-7.2,16.8-11.6,27.6-11.6H330
				c10.8,0,20.4,4.4,27.6,11.6s11.6,16.8,11.6,27.6v41.2h-124c-16.8,0-31.6,6.8-42.8,17.6c-10.8,10.8-17.6,26-17.6,42.8v2.8
				c0,16.8,6.8,31.6,17.6,42.8c10.8,10.8,26,17.6,42.8,17.6h124V311.8z M395.6,243L395.6,243c0,1.6-0.8,3.2-1.6,4
				c-1.2,1.2-2.4,1.6-4,1.6H245.2c-10.4,0-20.4-4.4-27.2-11.2s-11.2-16.8-11.2-27.2v-2.8c0-10.8,4.4-20.4,11.2-27.2
				c7.2-7.2,16.8-11.2,27.2-11.2H390c1.6,0,3.2,0.8,4,1.6c1.2,1.2,1.6,2.4,1.6,4V243z"
                          />
                          <path
                            fill="#E53B8E"
                            d="M248,190.6c-4.8,0-9.2,2-12.4,5.2c-3.2,3.2-5.2,7.6-5.2,12.4s2,9.2,5.2,12.4s7.6,5.2,12.4,5.2s9.2-2,12.8-5.2
				c3.2-3.2,5.2-7.6,5.2-12.8c0-4.8-2-9.2-5.2-12.8C257.2,192.6,252.8,190.6,248,190.6z"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                  <input
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full border-black outline-0 text-[#A0A0A0] text-[12px] text-center placeholder-gray-500"
                    placeholder="Enter your address"
                  />
                </div>
              </div>
              <div className="w-full max-w-[350px] mt-[24px] mb-[32px]">
                <div className="flex items-center space-x-1 border p-2 rounded-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#E53B8E"
                      d="M19,1H5A5.006,5.006,0,0,0,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V6A5.006,5.006,0,0,0,19,1ZM5,3H19a3,3,0,0,1,2.78,1.887l-7.658,7.659a3.007,3.007,0,0,1-4.244,0L2.22,4.887A3,3,0,0,1,5,3ZM19,21H5a3,3,0,0,1-3-3V7.5L8.464,13.96a5.007,5.007,0,0,0,7.072,0L22,7.5V18A3,3,0,0,1,19,21Z"
                    />
                  </svg>
                  <input
                    value={email}
                    readOnly={true}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-black outline-0 text-[#A0A0A0] text-[12px] text-center placeholder-gray-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <button
                disabled={
                  !email ||
                  !email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
                }
                onClick={onRequest}
                className="flex mt-1 flex-row justify-center items-center btn-grad-1 self-center w-full max-w-[300px] text-center disabled:opacity-60"
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                >
                  <g id="Icons">
                    <path
                      fill="#fff"
                      d="m12 18a1 1 0 0 1 -1-1v-15a1 1 0 0 1 2 0v15a1 1 0 0 1 -1 1z"
                    />
                    <path
                      fill="#fff"
                      d="m9 5a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.42l3-3a1 1 0 1 1 1.42 1.42l-3 3a1 1 0 0 1 -.71.29z"
                    />
                    <path
                      fill="#fff"
                      d="m15 5a1 1 0 0 1 -.71-.29l-3-3a1 1 0 0 1 1.42-1.42l3 3a1 1 0 0 1 0 1.42 1 1 0 0 1 -.71.29z"
                    />
                    <path
                      fill="#fff"
                      d="m19 24h-14a5 5 0 0 1 -5-5v-10a1 1 0 0 1 .4-.8l4-3a1 1 0 0 1 1.2 1.6l-3.6 2.7v9.5a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-9.5l-3.6-2.7a1 1 0 0 1 1.2-1.6l4 3a1 1 0 0 1 .4.8v10a5 5 0 0 1 -5 5z"
                    />
                  </g>
                </svg>
                <span className="pl-2">Request allocation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default ModalRequestAllocation;
