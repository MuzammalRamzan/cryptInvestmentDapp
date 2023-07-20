export const getFormatedDateTime = (seconds: number) => {
  const formatDateTime = (time: number) => {
    time = Number(time);
    const d = Math.floor(time / (3600 * 24));
    const h = Math.floor((time % (3600 * 24)) / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = Math.floor(time % 60);

    const dDisplay = d > 0 ? d + (d == 1 ? " d " : " d ") : "";
    const hDisplay = h > 0 ? h + (h == 1 ? " h " : " h ") : "";
    const mDisplay = m > 0 ? m + (m == 1 ? " m " : " m ") : "";
    const sDisplay = s > 0 ? s + (s == 1 ? " s" : " s") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
  };
  return formatDateTime(seconds);
};
