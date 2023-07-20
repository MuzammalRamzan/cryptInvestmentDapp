// interface IUserRegisterResponse {
// }

import useDisclosure from "../useDisclosure";

const useUserRegister = () => {
  const register = async (data: Record<string, any>) => {
    return fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/scrach_cards/register/`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
  };
  return { register };
};

export default useUserRegister;
