const roundToValueMapper: Record<string, number> = {
  1: 72000,
  2: 300000,
  3: 60551.25,
  4: 500000,
  5: 700000,
  6: 1350000,
  7: 1600000,
  8: 1925000,
};

export const getPreviousTotal = (currentRound: number) => {
  let previousTotal = 0;
  Object.entries(roundToValueMapper).forEach(([round, target]: any) => {
    if (parseInt(round) < currentRound) {
      previousTotal += target;
    }
  });
  return previousTotal;
};
