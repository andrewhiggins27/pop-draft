import ReactStars from 'react-stars'
import React from 'react'
import { render } from 'react-dom'

export const App = (props) => {
  const ratingChanged = (newRating) => {
    console.log(newRating)
  }

  return (
    <div>
      <h1>Make It So React</h1>
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={24}
        color2={'#ffd700'} 
      />
    </div>
  )
}

export default App
