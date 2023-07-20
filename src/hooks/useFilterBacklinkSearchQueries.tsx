const useFilterBacklinkSearchQueries = () => {
  const filterSearchQuery = async (data: Record<string, any>) => {
    return fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/scrach_cards/filter_backlink_search_queries/`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());
  };
  return { filterSearchQuery };
};

export default useFilterBacklinkSearchQueries;
