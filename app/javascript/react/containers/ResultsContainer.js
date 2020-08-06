import React, { useState, useEffect } from 'react'

import TeamSelectionTile from '../components/TeamSelectionTile'
import Teams from '../components/Teams'

const ResultsContainer = props => {
  const [game, setGame] = useState({})
  const [chosen, setChosen] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const [errors, setErrors] = useState("")

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

  const chooseTeam = (chosenId) => {
    if (chosenId === chosen) {
      setChosen(null)
    } else {
      setChosen(chosenId)
    }
  }

  const handleClick = event =>{
    event.preventDefault()
    fetch(`/api/v1/teams/${chosen}`, {
      credentials: "same-origin",
      method: "PATCH",
      body: JSON.stringify({
        gameId: props.match.params.id
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(body => {
      if (body.error) {
        setErrors(body.error)
        setChosen(null)
      } else {
        setGame(body.game)
        setChosen(null)
        setSuccessMsg("Vote Successful")
      }
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`))
  }

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

  let undrafted
  if (game.selections) {
    undrafted = game.selections.map(selection => {
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
    undrafted = <></>
  }

  let finalTeams
  if (game.teams) {
    finalTeams = game.teams.map((team, i)=> {
      let chosenTeam = false
      if (chosen === team.id) {
        chosenTeam = true
      }
      return (
        <Teams
          key={team.id}
          id={team.id}
          user={team.user}
          index={i}
          selections={team.selections}
          votes={team.votes}
          chosenTeam={chosenTeam}
          chooseTeam={chooseTeam}
        />
      )
    })
  } else {
    finalTeams = <></>
  }

  let errorMessages
  if (errors !== "") {
    errorMessages = <h3>{errors}</h3>
  } else {
    errorMessages = <></>
  }

  let successMessages
  if (successMsg) {
    successMessages = <h3>{successMsg}</h3>
  } else {
    successMessages = <></>
  }

  return(
    <div className='grid-container grid-x'>
      {errorMessages}
      <h1 className='text-center cell'>Results</h1>
      <h1 className='cell'>Final Teams:</h1>
      {chosen && <div className="button large cell alert" onClick={handleClick}>Vote!</div>}
      {successMessages}
      <div className="grid-x">
        {finalTeams}
      </div>
      <div>
        <h2>Draft Pool:</h2>
        <div className='callout cell grid-x'>
          {draftPool}
        </div>
      </div>
      <div>
        <h2>Undrafted:</h2>
        <div className='callout cell grid-x'>
          {undrafted}
        </div>
      </div>
    </div>
  )
}

export default ResultsContainer