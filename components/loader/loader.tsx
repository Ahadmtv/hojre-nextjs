import React from 'react'
import "./loader.css"
const Loader = ({ globalIsLoading }: { globalIsLoading: boolean }) => {
  if (!globalIsLoading) return null

  return (
    <div className="backdrop backdrop-blur-lg">
      <div>
        <img src={'/assets/images/loader.gif'} alt="Loading..."></img>
      </div>
    </div>
  )
}

export default Loader