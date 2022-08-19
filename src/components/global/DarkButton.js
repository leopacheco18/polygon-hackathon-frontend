import React from 'react'

const DarkButton = ({children, onClick, fontSize, padding, borderRadius, fontWeight, margin, className}) => {
  return (
    <div onClick={onClick} className={`dark-button ${className}`} style={{fontSize, margin, padding, borderRadius, fontWeight}} >{children}</div>
  )
}

export default DarkButton