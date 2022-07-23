import React from 'react'

const TextWithTopLine = ({children, fontSize, padding, fontWeight, borderTop, onClick, cursor}) => {
  return (
    <div onClick={onClick} className="text-top-border" style={{padding, borderTop,cursor}}>  <h2 style={{fontWeight,fontSize}}>{children}</h2> </div>
  )
}

export default TextWithTopLine