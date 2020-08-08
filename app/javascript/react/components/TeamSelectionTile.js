import React from 'react'

const TeamSelectionTiles = props => {
  let topLevelClasses = "cell small-4"
  let classes = "small-2 card team-selection-tile"
  let imageClasses = "card-section draft-team-images"

  let h4Classes = ""
  if (props.resultsTeam) {
    classes = "small-4 card team-selection-tile"
  }

  if (props.resultsDraftPool) {
    topLevelClasses = "cell small-3"
    h4Classes = "results-draft-pool-text"
  }


  return(
    <div className={topLevelClasses}>
      <div className={classes}>
        <div className="card-divider">
          <h4 className={h4Classes}>{props.name}</h4>
        </div>
        <div 
          className={imageClasses} 
          style={{backgroundImage: `url(${props.image})`}}
        >
        </div>
      </div>
    </div>
  )
}

export default TeamSelectionTiles


// <img
// src={props.image}
// alt={`image of ${props.name}`}
// />