import React from 'react'

const DarkButton = ({children, onClick}) => {
  return (
    <div onClick={onClick} className="dark-button">{children}</div>
  )
}

export default DarkButton