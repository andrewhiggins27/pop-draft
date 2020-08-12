import React from 'react'
import GameLobby from './GameLobby'

const LobbyPlayer = props => {
  return (
    <div className="cell card large-12 text-center lobby-names">
      <h5>{props.name}</h5>
    </div>
  )
}

export default LobbyPlayer