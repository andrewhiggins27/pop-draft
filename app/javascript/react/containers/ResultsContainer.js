import React from 'react'

import TeamSelectionTile from '../components/TeamSelectionTile'
import Teams from '../components/Teams'

const ResultsContainer = props => {
  let draftPool = props.payload.draftPool.map(selection => {
    return(
      <TeamSelectionTile
        key={selection.id}
        name={selection.name}
        description={selection.description}
        image={selection.image}
      />
    )
  })

  let finalTeams = props.payload.finalTeams.map((team, i)=> {
    return (
      <Teams
        key={i}
        selections={team}
      />
    )
  })

  return(
    <div className='grid-container grid-x'>
      <h1 className='text-center cell'>Results</h1>
      Draft Pool:
      {draftPool}
      <br></br>
      <h1 className='cell'>Final Teams:</h1>
      {finalTeams}
    </div>
  )
}

export default ResultsContainer