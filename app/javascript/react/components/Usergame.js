import React from 'react'

const Usergame = props => {
  return(
    <div>
      <h3>{props.game.pool_name}</h3>
      <h3>{props.game.created}</h3>
    </div>
  )
}

export default Usergame