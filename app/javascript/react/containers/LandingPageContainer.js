import React from 'react'
import { Link } from "react-router-dom";


const LandingPageContainer = props => {
  return(
    <div className="grid-container grid-x grid-margin-x">
      <div className="cell large-8 large-offset-2 landing-page-info grid-x">
        <h1 className="welcome-text cell text-center">Welcome to PopDraft!</h1>
        <p className='landing-page-description cell small-10 small-offset-1 text-center'>
          PopDraft is a pop-culture drafting game! Compete with your friends to draft the coolest teams from a variety of pop culture draft pools.
        </p>
        <Link to='/pools' className="cell small-8 small-offset-2 grid-x">
          <div className="button cell large alert small-12 text-center lets-draft-button">Let's Draft!</div>
        </Link>
        <h3 className="cell text-center">How to play:</h3>
          <ol className="cell small-8 large-8 small-offset-2">
            <li>Select one of our many draft pools.</li>
            <li>Select Local Draft (multiple players, one computer) or Online Draft (multiple players over the internet).</li>
            <li>Select the number of players.</li>
            <li>Start game! PopDraft will generate a unique draft class for your game</li>
            <li>Take turns drafting your teams! When it's your turn, simply click on a selection to draft it.</li>
            <ul>
                <li>In games with 3+ players, the draft order is serpentine. e.g. Player 1 -> Player 2 -> Player 3 -> Player 3 -> Player 2 -> Player 1.</li>
            </ul>
            <li>After everyone has drafted 6 selections, the draft concludes.</li>
            <li>On the results page, vote for who you think drafted the best team!</li>
            <ul>
              <li>You must be signed in to vote.</li>
              <li>A user gets one vote per game (you can change your vote, though!)</li>
            </ul>
          </ol>
        <Link to='/pools'>
        </Link>
      </div>
    </div>
  )
}

export default LandingPageContainer