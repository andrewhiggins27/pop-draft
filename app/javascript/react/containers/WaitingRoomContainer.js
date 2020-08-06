import React, { useState } from 'react'
import DraftContainer from './DraftContainer'

const WaitingRoomContainer = props => {
  const [startGame, setStartGame] = useState(false)

  const handleStartGameClick = event => {
    setStartGame(true)
  }
  
  if (startGame) {
    return (
      <DraftContainer
        poolId={props.match.params.id}
      />
    )
  }

  return (
    <div className="grid-container">
      <div className="button large cell text-center start-game" onClick={handleStartGameClick}>
        Start Local Draft
      </div>
    </div>
  )
}

export default WaitingRoomContainer