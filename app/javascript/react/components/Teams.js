import React from 'react'

import TeamSelectionTile from './TeamSelectionTile'

const Teams = props => {
  const clickHandler = event =>{
    if (props.chooseTeam) {
      props.chooseTeam(props.id)
    }
  }

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

  let teamName
  if (!props.user) {
    teamName = `Team ${props.index + 1}`
  } else {
    teamName = props.user.username
  }

  let classes = "cell large-6 small-6 callout results-team grid-x"
  if (props.chosenTeam) {
    classes += " chosen-tile"
  }

  let voteTotal = <h2 className="cell">Votes: {props.votes}</h2>
  if (props.draftInProgress) {
    voteTotal = <></>
  }

  return (
    <div className={classes} onClick={clickHandler}>
      <h5 className="cell">{teamName}</h5>
      {selectionTiles}
      {voteTotal}
    </div>
  )
}

export default Teams