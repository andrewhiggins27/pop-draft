import React from 'react'

const SelectionTile = props => {
  let classes = "cell callout large-3 small-4 text-center"

  if (props.chosen) {
   classes = "success " + classes
  }

  const handleClick = event => {
    event.preventDefault
    props.chooseSelection(props.id)
  }

  return (
    <div className={classes} onClick={handleClick}>
      {props.name}
      <br></br>
      <img
        src={props.image}
        alt={`image of ${props.name}`}
      />
    </div>
  )
}

export default SelectionTile