import React from 'react'
import '../../assets/styles/pages.css'
import UpcomingMenInternationalMatches from '../../components/UpComingMatches/Men/UpcomingMenInternationalMatches'
import UpcomingMenDomesticMatches from '../../components/UpComingMatches/Men/UpcomingMenDomesticMatches'
import UpcomingMenLeagueMatches from '../../components/UpComingMatches/Men/UpcomingMenLeagueMatches'
import UpcomingWomenMatches from '../../components/UpComingMatches/Women/UpcomingWomenMatches'

function UpcomingMatches() {
  return (
    <div className="pageBackground">
    <UpcomingMenInternationalMatches/>
    <UpcomingMenDomesticMatches />
    <UpcomingMenLeagueMatches />
    <UpcomingWomenMatches />
   
    </div>
  )
}

export default UpcomingMatches