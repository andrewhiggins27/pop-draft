import React from 'react'

import TeamSelectionTile from './TeamSelectionTile'

const Teams = props => {
  const clickHandler = event =>{
    if (props.chooseTeam) {
      props.chooseTeam(props.id)
    }
  }

  let selectionTiles = props.selections.map(selection => {
    let resultsTeam = true
    if (props.draftInProgress) {
      resultsTeam = false
    }

    return (
      <TeamSelectionTile
        key={selection.id}
        name={selection.name}
        description={selection.description}
        image={selection.image}
        resultsTeam={resultsTeam}
      />
    )
  })

  let teamName
  if (!props.user) {
    teamName = `Team ${props.index + 1}`
  } else {
    teamName = props.user.username
  }

  let classes = "cell large-6 medium-12 callout grid-x"
  let voteTotal = <h2 className="cell">Votes: {props.votes}</h2>
  
  if (props.chosenTeam) {
    classes += " chosen-tile"
  }
  if (props.draftInProgress) {
    classes += " draft-team"
    voteTotal = <></>
  } else {
    classes += " results-team"
  }

  return (
    <div className={classes} onClick={clickHandler}>
      <h5 className="cell">{teamName}</h5>
      {selectionTiles}
      {voteTotal}
      <br className="cell"></br>
    </div>
  )
}

export default Teams