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
      />
    )
  })

  return (
    <div className="cell small-4 callout">
      TEAM:
      {selectionTiles}
    </div>
  )
}

export default Teams