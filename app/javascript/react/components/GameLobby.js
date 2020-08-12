import React from 'react'

import LobbyPlayer from '../components/LobbyPlayer'

const GameLobby = props => {
  const lobbyPlayers = props.players.map(player => {
    return(
      <LobbyPlayer
        key={player}
        name={player}
      />
    )
  })

  return ( 
    <div className="callout game-lobby grid-x grid-margin-x">
      <h5 className="cell small-12">Waiting for other players to join...  {props.players.length}/{props.totalNumOfPlayers}</h5>
      <div className="button large cell small-6 small-offset-3 alert start-draft-button" onClick={props.startGameClick}>
        Start Draft
      </div>
      <h5 className="cell small-12">Players in Lobby:</h5>
      <div className="callout cell small-12 grid-x grid-margin-x">
        {lobbyPlayers}
      </div>
    </div>
  )
}

export default GameLobby
