import React from 'react'

const SelectionTile = props => {
  let classes = "cell card large-3 small-4 text-center"

  if (props.chosen) {
   classes = "chosen-tile " + classes
  }

  const handleClick = event => {
    event.preventDefault
    props.chooseSelection(props.id)
  }

  return (
    <div className={classes} onClick={handleClick}>
      <div className="card-divider">
        <h4 className="selection-text">{props.name}</h4>
      </div>
      <div className="card-section">
        <img
          src={props.image}
          alt={`image of ${props.name}`}
        />
      </div>
    </div>
  )
}

export default SelectionTile