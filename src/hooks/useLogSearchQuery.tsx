interface ILogSearchQueryData {
  user_search_email: string;
  user_search_domain: string;
  user_search_keyword: string;
  wallet_address: string;
  payment_status: string;
  user_id: number;
}

const useLogSearchQuery = () => {
  const logSearchQuery = async (data: ILogSearchQueryData) => {
    return fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/scrach_cards/log_search_query/`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    ).then((res) => res.json());
  };
  return { logSearchQuery };
};

export default useLogSearchQuery;
