import React from 'react'
import { Link } from 'react-router-dom'

const Usergame = props => {

  let playerNames

  if (props.game.players.length === 1) {
    playerNames = <li>Local Draft</li>
  } else{
    playerNames = props.game.players.map(player => {
      return <li key={player}>{player}</li>
    })
  }
  
  return(
    <div className="cell large-3 medium-4 small-6 card">
      <Link to={`/games/${props.game.id}/results`}>
        <div className="card-section">
          <h4>{props.game.pool_name}</h4>
          <h4>{props.game.created}</h4>
          <h4>Players:</h4>
            {playerNames}
        </div>
      </Link>
    </div>
  )
}

export default Usergame