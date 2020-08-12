import React from 'react'

const TeamSelectionTiles = props => {
  let imageClasses = "card-section draft-team-images"
  let h4Classes = "draft-team-text"

  if (props.resultsTeam) {
    imageClasses = "card-section results-team-images"
    h4Classes = "results-teams-text"
  }

  if (props.resultsDraftPool) {
    imageClasses = "card-section results-draft-pool-images"
    h4Classes = "results-draft-pool-text"
  }

  return(
      <div>
        <div className="card-divider">
          <h4 className={h4Classes}>{props.name}</h4>
        </div>
        <div 
          className={imageClasses} 
          style={{backgroundImage: `url(${props.image})`}}
        >
        </div>
      </div>
  )
}

export default TeamSelectionTiles
