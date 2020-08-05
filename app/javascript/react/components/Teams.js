import React from 'react'

import TeamSelectionTile from './TeamSelectionTile'

const Teams = props => {
  let selectionTiles = props.selections.map(selection => {
    return (
      <TeamSelectionTile
        key={selection.id}
        name={selection.name}
        description={selection.description}
        image={selection.image}
        resultsTeam={true}
      />
    )
  })

  return (
    <div className="cell small-6 callout results-team grid-x">
      {selectionTiles}
    </div>
  )
}

export default Teams