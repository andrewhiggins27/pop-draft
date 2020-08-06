import React from 'react'

const TeamSelectionTiles = props => {
  let classes = "small-2 card results-spacing"

  if (props.resultsTeam) {
    classes = "small-6 large-5 card results-spacing"
  }
  return(
    <div className={classes}>
      <div className="card-divider">
        <h4>{props.name}</h4>
      </div>
      <div className="card-section">
        <img
          src={props.image}
          alt={`image of ${props.name}`}
        />
      </div>
    </div>
  )
}

export default TeamSelectionTiles