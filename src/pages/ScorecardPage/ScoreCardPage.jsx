import '../../assets/styles/pages.css'
import MatchScorecard from '../../components/Scorecard/MatchScorecard'
function ScorecardPage() {
  return (
    <div className="pageBackground">
    
       
        <MatchScorecard
          scoreCard={scorecardData.scoreCard}
          matchHeader={scorecardData.matchHeader}
        />
     
    </div>
  )
}

export default ScorecardPage