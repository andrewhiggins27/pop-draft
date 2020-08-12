import React from 'react'
import { Link } from 'react-router-dom'

const WaitingGame = props => {

  return (
    <div className="callout cell large-3 small-6">
      <Link to={`/games/${props.id}/online`}>
        <div>
          <h4>Created by: {props.creator}</h4>
          <h4>Created at: {props.createdAt}</h4>
          <h5>{props.numberOfPlayers} player Draft</h5>
        </div>
      </Link>
    </div>
  )
}

export default WaitingGame