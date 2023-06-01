import React from 'react'
import PlayerDataComponent from '../../components/Players';
import News from "../../components/News"
import '../../assets/styles/pages.css'
function Home() {
  return (
    <div className="pageBackground">
    <h1>Cricket Fever</h1>
    <News/>
    <PlayerDataComponent/>
    </div>
  )
}

export default Home