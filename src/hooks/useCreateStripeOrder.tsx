const useCreateStripeOrder = () => {
  const createStripeOrder = async (data: Record<string, any>) => {
    return fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/scrach_cards/create-stripe-order/`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());
  };
  return { createStripeOrder };
};

export default useCreateStripeOrder;
