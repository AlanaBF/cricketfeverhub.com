export const findCurrentMatch = (matchId, matchesData) => {
  const currentMatch = matchesData
    .flatMap((seriesMatch) => seriesMatch.seriesAdWrapper.matches)
    .find((match) => match.matchInfo.matchId === matchId);
  return currentMatch;
};


