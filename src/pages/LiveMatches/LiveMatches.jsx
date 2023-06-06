import '../../assets/styles/pages.css'
import LiveMenInternationalMatches from '../../components/LiveCricketMatches/Men/LiveMenInternationalMatches'
import LiveMenDomesticMatches from '../../components/LiveCricketMatches/Men/LiveMenDomesticMatches'
import LiveMenLeagueMatches from '../../components/LiveCricketMatches/Men/LiveMenLeagueMatches'
import LiveWomenMatches from '../../components/LiveCricketMatches/Women/LiveWomenMatches'
function LiveMatches() {
  return (
    <div className="pageBackground">
    <LiveMenInternationalMatches/>
    <LiveMenDomesticMatches />
    <LiveMenLeagueMatches />
    <LiveWomenMatches />
   
    </div>
  )
}

export default LiveMatches