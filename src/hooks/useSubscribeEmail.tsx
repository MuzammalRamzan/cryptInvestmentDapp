const useSubscribeEmail = () => {
  const subscribe = async (data: Record<string, any>) => {
    const body = {
      ...data,
      api_key: process.env.NEXT_PUBLIC_OCTOPUS_EMAIL_API_KEY,
    };
    fetch(`/api/email-octopus`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((e) => {});
  };
  return { subscribe };
};

export default useSubscribeEmail;
