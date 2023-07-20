export interface IBacklinkEstimationResult {
  "averageDomainAuthorityForLink-1": number;
  "averagePageAuthorityForLink-1": number;
  "backlinkCountForLink-1": number;
  "uniqueDomainAuthorityForLink-1": number;
}

const usePredictBacklinkEstimation = () => {
  const predictBacklink = async (
    data: Record<string, any>
  ): Promise<IBacklinkEstimationResult> => {
    return fetch(
      `${process.env.NEXT_PUBLIC_CONTENT_API}/contentapi/process-data`,
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
  return { predictBacklink };
};

export default usePredictBacklinkEstimation;
