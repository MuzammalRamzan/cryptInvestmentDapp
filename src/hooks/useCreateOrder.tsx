interface ICreateOrderResponse {
  data: { id: number; value: string; fromAddress: string; clickId: string };
  success: boolean;
}

const useCreateOrder = () => {
  const createOrder = async (
    data: Record<string, any>
  ): Promise<ICreateOrderResponse> => {
    return fetch("https://rensketech.com/api/scrach_cards/create-order/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json());
  };
  return { createOrder };
};

export default useCreateOrder;
