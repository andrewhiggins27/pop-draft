import React from 'react'

import { Link } from 'react-router-dom'

const PoolTile = props => {

  return (
    <div className="card cell small-4">
      <Link to={`/pools/${props.id}`}>
        <div className="card-divider">
          <h2>{props.name}</h2>
        </div>
      </Link>
      <div className="card-section" style={{
        backgroundImage: `url(${props.image})`,
        backgroundSize: 'cover',
        padding: '5rem',
        paddingBottom: '18rem'
      }}>
      </div>
    </div>
  )
}

export default PoolTile
