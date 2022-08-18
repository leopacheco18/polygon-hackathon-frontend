import React from 'react'

const DarkButton = ({children, onClick, fontSize, padding, borderRadius, fontWeight, margin}) => {
  return (
    <div onClick={onClick} className="dark-button" style={{fontSize, margin, padding, borderRadius, fontWeight}} >{children}</div>
  )
}

export default DarkButton