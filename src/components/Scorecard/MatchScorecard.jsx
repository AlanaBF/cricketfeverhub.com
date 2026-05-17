import "../../assets/styles/components.css";
import "../../assets/styles/pages.css";

import PartnershipDataComponent from "./PartnershipsData";
import WicketsDataComponent from "./WicketsData";
import ExtrasDataComponent from "./ExtrasData";
import BatsmenDataComponent from "./BattersData";
import BowlersDataComponent from "./BowlersData";
import SummaryInningsDataComponent from "./SummaryInningsCard";
import MatchMap from "../MatchMap";

const LiveMatchScoreCard = ({ scoreCard, venueInfo, matchHeader, matchId, matchStatus }) => {
  if (!scoreCard || !Array.isArray(scoreCard) || scoreCard.length === 0) {
    return <div className="pageDescription">Scorecard data is not yet available for this match.</div>;
  }

  return (
    <div className="live-matches">
      {matchHeader && (
        <section className="scorecard-container">
          <h1 className="intro-description">{matchHeader.seriesDesc}</h1>
          <h2 className="intro-description">
            {matchHeader.team1?.name} vs {matchHeader.team2?.name}
          </h2>
        </section>
      )}

      {matchStatus && (
        <div className="intro-description">
          <strong>Status:</strong> {matchStatus}
        </div>
      )}

      <div>
        {venueInfo && <MatchMap venueInfo={venueInfo} matchId={matchId} />}
        {scoreCard.map((innings, inningsIndex) => (
          <section
            key={innings.inningsid || inningsIndex}
            className={inningsIndex % 2 === 0 ? "section-dark" : "section-light"}
            aria-label={`${innings.batteamname || `Team ${inningsIndex + 1}`} innings`}
          >
            <div className="teams-container">
              <div className="team-container">
                <h2 className={inningsIndex % 2 === 0 ? "dark-heading" : ""}>
                  {innings.batteamname || `Team ${inningsIndex + 1}`} - Innings {inningsIndex + 1}
                  {innings.isdeclared ? " (declared)" : ""}
                </h2>
                <SummaryInningsDataComponent
                  scoreDetails={{
                    runs: innings.score,
                    wickets: innings.wickets,
                    overs: innings.overs,
                    runRate: innings.runrate,
                    runsPerBall: innings.rpb,
                  }}
                />
                <div className="scorecard-section">
                  {innings.batsman && innings.batsman.length > 0 && (
                    <div className="scorecard-column">
                      <BatsmenDataComponent batsmenData={innings.batsman} />
                    </div>
                  )}
                  {innings.bowler && innings.bowler.length > 0 && (
                    <div className="scorecard-column">
                      <BowlersDataComponent bowlersData={innings.bowler} />
                    </div>
                  )}
                  {innings.extras && (
                    <div className="scorecard-column">
                      <ExtrasDataComponent extrasData={innings.extras} />
                    </div>
                  )}
                  {innings.partnership?.partnership && (
                    <div className="scorecard-column">
                      <PartnershipDataComponent partnershipsData={innings.partnership.partnership} />
                    </div>
                  )}
                  {innings.fow?.fow && (
                    <div className="scorecard-column">
                      <WicketsDataComponent wicketsData={innings.fow.fow} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default LiveMatchScoreCard;
