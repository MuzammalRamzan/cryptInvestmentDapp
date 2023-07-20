interface ICreateOrderFinixioResponse {
  statusCode: number;
  data: {
    message: string;
  };
}

const useCreateOrderFinixio = () => {
  const createOrderFinixio = async (
    data: Record<string, any>
  ): Promise<ICreateOrderFinixioResponse> => {
    return fetch(
      `${process.env.NEXT_PUBLIC_FINIXIO_API_URL}/api/postback/presale`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_FINIXIO_SECRET}`,
        },
      }
    ).then((res) => res.json());
  };
  return { createOrderFinixio };
};

export default useCreateOrderFinixio;
