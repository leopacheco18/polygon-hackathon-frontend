import React from 'react'

const GreenButton = ({children, onClick, className}) => {
  return (
    <div className={`greenButton ${className}`} onClick={onClick}>
        {children}
    </div>
  )
}

export default GreenButton