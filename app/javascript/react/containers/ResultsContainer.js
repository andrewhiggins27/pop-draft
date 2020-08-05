import React, { useState, useEffect } from 'react'

import TeamSelectionTile from '../components/TeamSelectionTile'
import Teams from '../components/Teams'

const ResultsContainer = props => {
  const [game, setGame] = useState({})

  let gameId = props.match.params.id

  useEffect(() => {
    fetch(`/api/v1/games/${gameId}`, {
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
        setGame(body.game)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  let draftPool
  if (game.draft_class) {
    draftPool = game.draft_class.selections.map(selection => {
      return(
        <TeamSelectionTile
          key={selection.id}
          name={selection.name}
          description={selection.description}
          image={selection.image}
        />
      )
    })
  } else {
    draftPool = <></>
  }

  let finalTeams
  if (game.teams) {
    finalTeams = game.teams.map((team, i)=> {
      return (
        <Teams
          key={i}
          selections={team.selections}
        />
      )
    })
  } else {
    finalTeams = <></>
  }

  return(
    <div className='grid-container grid-x'>
      <h1 className='text-center cell'>Results</h1>
        <h2>Draft Pool:</h2>
      <div className='callout cell grid-x'>
        {draftPool}
      </div>
      <br></br>
      <h1 className='cell'>Final Teams:</h1>
      {finalTeams}
    </div>
  )
}

export default ResultsContainer