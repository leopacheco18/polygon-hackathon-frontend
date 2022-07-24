import React from 'react'

const GreenButton = ({children, onClick}) => {
  return (
    <div className="greenButton" onClick={onClick}>
        {children}
    </div>
  )
}

export default GreenButton