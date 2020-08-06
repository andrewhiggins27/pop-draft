import React from 'react'

import { Link } from 'react-router-dom'

const PoolTile = props => {


  return (
    <div className="card cell " style={{
      width: '20rem',
      height: '20rem'
      }}>
        <Link to={`/pools/${props.id}`}>
        <div className="card-divider">
          <h2>{props.name}</h2>
        </div>
        </Link>
        <div className="card-section" style={{
          backgroundColor: '#74ebd5',
          backgroundImage: `url(${props.image})`,
          backgroundSize: 'cover'
        }}>
        </div>
      </div>
  )
}

export default PoolTile
