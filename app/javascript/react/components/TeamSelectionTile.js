import React from 'react'

const TeamSelectionTiles = props => {
  let classes = "cell small-2 large-1 team-tile callout"

  if (props.resultsTeam) {
    classes = "cell small-6 large-4 team-tile callout"
  }
  return(
    <div className={classes}>
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