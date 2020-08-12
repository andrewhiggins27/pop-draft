import React from 'react'

const NumberOfPlayersRadioButtons = props => {
  const handleChange = event =>{
    event.preventDefault
    props.chooseNumberPlayers(event.currentTarget.value)
  }

  return(
    <div className="grid-x cell small-12">
      <form>
        <div className="radio cell">
          <label>
            <input type="radio" value="2" name="number-of-players" checked={props.selectedOption === "2"} onChange={handleChange} />
            2 Players
          </label>
        </div>
        <div className="radio cell">
          <label>
            <input type="radio" value="3" name="number-of-players" checked={props.selectedOption === "3"} onChange={handleChange}/>
            3 Players
          </label>
        </div>
        <div className="radio cell">
          <label>
            <input type="radio" value="4" name="number-of-players" checked={props.selectedOption === "4"} onChange={handleChange}/>
            4 Players
          </label>
        </div>
      </form>
    </div>
  )
}

export default NumberOfPlayersRadioButtons