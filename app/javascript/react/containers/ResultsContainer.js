import React, { useState, useEffect } from 'react'
import ReactHover, { Trigger, Hover } from 'react-hover'
import { useAlert } from 'react-alert'

import HoverDescription from '../components/HoverDescription'
import TeamSelectionTile from '../components/TeamSelectionTile'
import Teams from '../components/Teams'

const ResultsContainer = props => {
  const [game, setGame] = useState({})

  const alert = useAlert()

  useEffect(() => {
    let gameId = props.match.params.id
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

  const handleNewResultsClick = event => {
    event.preventDefault()
    fetch(`/api/v1/games`, {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify({
        gameId: game.id
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
      setGame(body.game)
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`))
  }

  const handleVoteClick = (teamId) => {
    fetch(`/api/v1/teams/${teamId}`, {
      credentials: "same-origin",
      method: "PATCH",
      body: JSON.stringify({
        gameId: game.id
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
        alert.error(body.error)
        setChosen(null)
      } else {
        setGame(body.game)
        alert.success("Vote Successful")
      }
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`))
  }

  const optionsCursorTrueWithMargin = {
    followCursor: true,
    shiftX: 20,
    shiftY: 0,
  }

  let draftPool
  if (game.draft_class) {
    draftPool = game.draft_class.selections.map(selection => {
      let opacityClass = ""

      game.teams.forEach((team) => {
        team.selections.forEach((teamSelection) =>{
          if (teamSelection.name === selection.name) {
            opacityClass += " opacity-tile"
          }
        })
      })

      return(
        <div className="small-6 large-2 card team-selection-tile" key={selection.id}>
          <ReactHover options={optionsCursorTrueWithMargin}>
            <Trigger type='trigger'>
              <div className={opacityClass}>
                <TeamSelectionTile
                  name={selection.name}
                  description={selection.description}
                  image={selection.image}
                  resultsDraftPool={true}
                />
              </div>
            </Trigger>
            <Hover type='hover'>
              <HoverDescription
                name={selection.name}
                description={selection.description}
                image={selection.image}
              />
            </Hover>
          </ReactHover>
        </div>
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
          key={team.id}
          id={team.id}
          user={team.user}
          index={i}
          selections={team.selections}
          votes={team.votes}
          submitVote={handleVoteClick}
        />
      )
    })
  } else {
    finalTeams = <></>
  }

  let  poolName
  if (game.draft_class) {
    poolName = <h1 className="pool-name-text text-center">{game.draft_class.pool.name}</h1>
  }

  return(
    <div className='grid-container results-page'>
      {poolName}
      <div className="grid-x grid-padding-x">
        <h2 className='cell small-6'>Results</h2>
        <div className="button cell large small-6" onClick={handleNewResultsClick}>
          View Another Game
        </div>
      </div>
      <h1 className='cell londrina-solid'>Final Teams: (Click on team to vote for the winner!)</h1>
      <div className="grid-x grid-margin-x final-teams">
        {finalTeams}
      </div>
      <div>
        <h2>Draft Pool:</h2>
        <div className='cell grid-x'>
          {draftPool}
        </div>
      </div>
    </div>
  )
}

export default ResultsContainer
