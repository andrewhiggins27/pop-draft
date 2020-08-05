import React from 'react'

const TeamSelectionTiles = props => {

  return(
    <div className="cell small-2 large-1">
      {props.name}
      <br></br>
      <img
        src={props.image}
        alt={`image of ${props.name}`}
      />
    </div>
  )
}

export default TeamSelectionTiles