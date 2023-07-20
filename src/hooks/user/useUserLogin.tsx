// interface IUserRegisterResponse {
// }

import useDisclosure from "../useDisclosure";

const useUserLogin = () => {
  const login = async (data: Record<string, any>) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/scrach_cards/login/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  };
  return { login };
};

export default useUserLogin;
