interface ICheckTransactionStatus {
  success: boolean;
  _value: number;
}

const useCheckTransactionStatus = () => {
  const checkTransaction = async (
    data: Record<string, any>
  ): Promise<ICheckTransactionStatus> => {
    return fetch("https://rensketech.com/api/scrach_cards/check-transaction/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json());
  };
  return { checkTransaction };
};

export default useCheckTransactionStatus;
