import React from 'react'
import ReactHover, { Trigger, Hover } from 'react-hover'

import TeamSelectionTile from './TeamSelectionTile'
import SmallHoverDescription from './SmallHoverDescription'

const Teams = props => {
  const clickHandler = event =>{
    if (props.chooseTeam) {
      props.chooseTeam(props.id)
    }
  }

  const optionsCursorTrueWithMargin = {
    followCursor: true,
    shiftX: 20,
    shiftY: 0,
  }

  let selectionTiles = props.selections.map(selection => {
    let resultsTeam = true
    let classes = "small-6 large-4 card team-selection-tile"

    if (props.draftInProgress) {
      resultsTeam = false
      classes = "cell small-4 card team-selection-tile"
    }

    return (
      <div key={selection.id} className={classes}>
        <ReactHover
        options={optionsCursorTrueWithMargin}>
          <Trigger type='trigger'>
            <TeamSelectionTile
              key={selection.id}
              name={selection.name}
              description={selection.description}
              image={selection.image}
              resultsTeam={resultsTeam}
            />
          </Trigger>
          <Hover type='hover'>
            <SmallHoverDescription
              className="small-hover-description cell"
              name={selection.name}
              description={selection.description}
            />
          </Hover>
        </ReactHover>

      </div>
    )
  })

  let teamName
  if (!props.user) {
    teamName = `Team ${props.index + 1}`
  } else {
    teamName = `${props.user.username}'s Team`
  }

  let classes = "cell large-6 grid-x all-teams"
  let voteTotal = <h2 className="cell votes">Votes: {props.votes}</h2>
  
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
      <h5 className="cell team-name">{teamName}</h5>
      {selectionTiles}
      {voteTotal}
      <br className="cell"></br>
    </div>
  )
}

export default Teams