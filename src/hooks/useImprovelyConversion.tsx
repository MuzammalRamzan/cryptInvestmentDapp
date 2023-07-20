interface IImprovelyConversionResponse {
  status: "success";
}

const useImprovelyConversion = () => {
  const createConversion = async (
    data: Record<string, any>
  ): Promise<IImprovelyConversionResponse> => {
    return fetch("/api/conversion", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json());
  };
  return { createConversion };
};

export default useImprovelyConversion;
