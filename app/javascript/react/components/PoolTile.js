import React from 'react'

import { Link } from 'react-router-dom'

const PoolTile = props => {

  return (
    <div className="card cell small-4">
      <Link to={`/pools/${props.id}`}>
        <div className="card-divider">
          <h3>{props.name}</h3>
        </div>
      </Link>
      <div className="card-section" style={{
        backgroundImage: `url(${props.image})`,
        backgroundSize: 'cover',
        padding: '7rem',
        paddingBottom: '10rem'
      }}>
      </div>
    </div>
  )
}

export default PoolTile
