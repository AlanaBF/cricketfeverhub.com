export const findCurrentMatch = (matchId, matchesData) => {
  const currentMatch = matchesData
    .flatMap((seriesMatch) => seriesMatch.seriesAdWrapper.matches)
    .find((match) => {
      return match.matchInfo.matchId === Number(matchId);
    });
  return currentMatch;
};
