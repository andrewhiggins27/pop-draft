import React from 'react'
import { Link } from 'react-router-dom'

const WaitingGame = props => {

  if (props.currentNumOfPlayers === props.numberOfPlayers) {
    return <></>
  }

  return (
    <div className="cell large-3 card waiting-room-games">
      <Link to={`/games/${props.id}/online`}>
        <div>
          <h4 className="waiting-games-text">Created by: {props.creator}</h4>
          <h4 className="waiting-games-text">Created at: {props.createdAt}</h4>
          <h5>{props.numberOfPlayers} player Draft</h5>
          <h5>{props.currentNumOfPlayers} / {props.numberOfPlayers}</h5>
        </div>
      </Link>
    </div>
  )
}

export default WaitingGame