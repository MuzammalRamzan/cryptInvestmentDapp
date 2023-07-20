import useDisclosure from "@/hooks/useDisclosure";
import React, { useState } from "react";
import ModalRequestAllocation from "../ModalRequestAllocation";

const StatusMapper: Record<string, any> = {
  PE: "Payment not received.",
  AL: "Allocation success.",
  PA: "Payment received, allocation pending.",
};

const OrdersTable: React.FC<{
  orders: OrderInterface[];
}> = ({ orders }) => {
  const [orderToRequest, setOrderToRequest] = useState<OrderInterface>(
    {} as OrderInterface
  );
  const headings = [
    "Date & Time",
    "Amount",
    "Amount Paid",
    "YPRED",
    "Allocation Address",
    "Paid to",
    "Email",
    "Allocation Status",
  ];
  const getUnpaidStatus = (
    amountUnpaid: number,
    currency: string,
    address: string
  ) =>
    `Transaction underpaid by ${amountUnpaid} ${currency}. Please pay the ${amountUnpaid} ${currency} to your assigned wallet address and notify support via email (<a style="color:dodgerblue;" href="mailto:help@ypredict.ai">help@ypredict.ai</a>) Payment Wallet Address: ${address}.`;

  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <ModalRequestAllocation
        isOpen={isOpen}
        onClose={onClose}
        order={orderToRequest}
      />
      <table className="w-full min-w-fit divide-y divide-gray-200 min-h-[10rem]">
        <thead className="bg-gray-100 w-full sticky top-0 z-10">
          <tr>
            {headings.map((item, index) => (
              <th
                key={index}
                className="w-fit py-3 px-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 whitespace-nowrap"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders?.map((order, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-3 text-xs font-normal text-gray-700 max-w-[300px]">
                {`${new Date(order.datetime).toLocaleDateString()}, ${new Date(
                  order.datetime
                ).toLocaleTimeString()}`}
              </td>
              <td className="py-2 px-3 text-xs font-normal text-gray-700 whitespace-nowrap">
                {order.value} {order.currency}
              </td>
              <td className="py-2 px-3 text-xs font-normal text-gray-700 whitespace-nowrap">
                {order.balance} {order.currency}
              </td>
              <td className="py-2 px-3 text-xs font-normal text-gray-700 whitespace-nowrap">
                {order.ypred} YPRED
              </td>
              <td className="py-2 px-3 text-xs font-normal text-gray-700">
                <p>{order?._from || "NA, Contact support"}</p>
                {order.status === "PA" && (
                  <button
                    onClick={() => {
                      onOpen();
                      setOrderToRequest(order);
                    }}
                    className="text-skin-pink underline mt-2"
                  >
                    Request Allocation
                  </button>
                )}
              </td>
              <td className="py-2 px-3 text-xs font-normal text-gray-700">
                {order?.address}
              </td>
              <td className="py-2 px-3 text-xs font-normal text-gray-700">
                {order?.email}
              </td>
              <td className="py-2 px-3 text-xs font-normal text-gray-700 max-w-fit min-w-[300px]">
                {order?.status === "UP" ? (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: `${getUnpaidStatus(
                        Number(Number(order?.value) - order.balance),
                        order.currency,
                        order.address
                      )}`,
                    }}
                  />
                ) : (
                  StatusMapper[order?.status] || ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default OrdersTable;
