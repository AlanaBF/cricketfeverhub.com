import React from 'react';

const MatchComms = ({ matchData }) => {
  const { typeMatches } = matchData;
  
  return (
    <div>
      {typeMatches.map((typeMatch, index) => (
        <div key={index}>
          <h3>{typeMatch.matchType}</h3>
          {typeMatch.seriesMatches.map((seriesMatch, index) => (
            <div key={index}>
              {seriesMatch.seriesAdWrapper && (
                <div>
                  <h4>{seriesMatch.seriesAdWrapper.seriesName}</h4>
                  {seriesMatch.seriesAdWrapper.matches.map((match, index) => (
                    <div key={index}>
                      <h5>{match.matchInfo.matchDesc}</h5>
                      <p>Status: {match.matchInfo.status}</p>
                      {/* Display other match details */}
                    </div>
                  ))}
                </div>
              )}
              {seriesMatch.adDetail && (
                <div>
                  <h4>{seriesMatch.adDetail.name}</h4>
                  {/* Display ad details */}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MatchComms;

