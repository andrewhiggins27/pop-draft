import React, { useState, useEffect } from 'react'

import SelectionTile from './SelectionTile'
import ResultsContainer from './ResultsContainer'

const DraftContainer = props => {
  const [draftPool, setDraftPool] = useState([])
  const [selections, setSelections] = useState([])
  const [teamOneSelections, setTeamOneSelections] = useState([])
  const [teamTwoSelections, setTeamTwoSelections] = useState([])
  const [chosen, setChosen] = useState(null)
  const [currentPlayer, setCurrentPlayer] = useState(1)
  
  let poolId = props.match.params.id

  const chooseSelection = (selectionID) => {
    if (selectionID === chosen) {
      setChosen(null)
    } else {
      setChosen(selectionID)
    }
  }

  useEffect(() => {
    fetch(`/api/v1/pools/${poolId}`, {
      credentials: 'same-origin'
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw (error);
        }
      })
      .then(response => response.json())
      .then(body => {
        setSelections(body)
        setDraftPool(body)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const SelectionTiles = selections.map((selection) => {
    let chosenTile = false
    if (chosen === selection.id) {
      chosenTile = true
    }

    return(
      <SelectionTile
        key={selection.id}
        id={selection.id}
        name={selection.name}
        description={selection.description}
        image={selection.image}
        chooseSelection={chooseSelection}
        chosen={chosenTile}
      />
    )
  })

  const TeamOneSelectionTiles = teamOneSelections.map(selection => {
    return(
      <SelectionTile
        key={selection.id}
        name={selection.name}
        description={selection.description}
        image={selection.image}
      />
    )
  })

  const TeamTwoSelectionTiles = teamTwoSelections.map(selection => {
    return(
      <SelectionTile
        key={selection.id}
        name={selection.name}
        description={selection.description}
        image={selection.image}
      />
    )
  })

  const draftClick = event => {
    event.preventDefault()
    if (currentPlayer === 1) {
      let draftPick = selections.find(selection => selection.id === chosen)
      setTeamOneSelections([...teamOneSelections, draftPick])
      setSelections(selections.filter(selection => selection !== draftPick))
      setCurrentPlayer(2)
      setChosen(null)
    } else if (currentPlayer === 2) {
      let draftPick = selections.find(selection => selection.id === chosen)
      setTeamTwoSelections([...teamTwoSelections, draftPick])
      setSelections(selections.filter(selection => selection !== draftPick))
      setCurrentPlayer(1)
      setChosen(null)
    }
  }

  let draftButton
  if (chosen) {
    draftButton = <div className="button cell" onClick={draftClick}>Draft!</div>
  } else {
    draftButton = <></>
  }

  if (teamOneSelections.length === 5 && teamTwoSelections.length === 5) {
    let payload = {
      poolId: poolId,
      draftPool: draftPool,
      undrafted: selections,
      finalTeams: [teamOneSelections, teamTwoSelections],
    }

    return (
      <ResultsContainer
        payload={payload}
      />
    )
  }

  return(
    <div className='grid-y'>
      {draftButton}
      <div className='grid-x cell'>
        <div className="cell large-2 text-center">
          Team One:
          {TeamOneSelectionTiles}
        </div>
        <div className='grid-container grid-x cell large-8'>
          {SelectionTiles}
        </div>
        <div className="cell large-2 text-center">
          Team Two:
          {TeamTwoSelectionTiles}
        </div>
      </div>
    </div>
  )
}

export default DraftContainer