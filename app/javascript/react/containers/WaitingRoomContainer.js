import React, { useState } from 'react'

import DraftContainer from './DraftContainer'
import NumberOfPlayersRadioButtons from '../components/NumberOfPlayersRadioButtons'

const WaitingRoomContainer = props => {
  const [startGame, setStartGame] = useState(false)
  const [numOfPlayers, setNumOfPlayers] = useState("2")

  const chooseNumberPlayers = (number) =>{
    setNumOfPlayers(number)
  }

  const handleStartGameClick = event => {
    setStartGame(true)
  }
  
  if (startGame) {
    return (
      <DraftContainer
        poolId={props.match.params.id}
        numberOfPlayers={numOfPlayers}
      />
    )
  }

  return (
    <div className="grid-container">
      <h2>Choose Number of Players:</h2>
      <NumberOfPlayersRadioButtons
        chooseNumberPlayers={chooseNumberPlayers}
        selectedOption={numOfPlayers}
      />
      <div className="button large cell text-center start-game" onClick={handleStartGameClick}>
        Start Local Draft
      </div>
    </div>
  )
}

export default WaitingRoomContainer