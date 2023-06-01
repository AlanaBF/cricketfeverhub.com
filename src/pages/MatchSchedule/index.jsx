import React from 'react'
import '../../assets/styles/pages.css'
import LiveInternationalCricketMatches from '../../components/LiveMatches'
import UpcomingCricketMatches from '../../components/ComingUp'
function MatchSchedule() {
  return (
    <div className="pageBackground">
    <LiveInternationalCricketMatches/>
    <UpcomingCricketMatches/>
    </div>
  )
}

export default MatchSchedule