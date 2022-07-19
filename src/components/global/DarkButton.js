import React from 'react'

const DarkButton = ({children, onClick, fontSize, padding, borderRadius, fontWeight}) => {
  return (
    <div onClick={onClick} className="dark-button" style={{fontSize, padding, borderRadius, fontWeight}} >{children}</div>
  )
}

export default DarkButton