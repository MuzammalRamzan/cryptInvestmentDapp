interface IConnectWalletUser {
  user_id: number;
  wallet_address: string;
  wallet_balance: number;
}
const useConnectWalletUser = () => {
  const connectWithWallet = async (data: IConnectWalletUser) => {
    return fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/scrach_cards/connect_wallet_with_user/`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());
  };
  return { connectWithWallet };
};

export default useConnectWalletUser;
