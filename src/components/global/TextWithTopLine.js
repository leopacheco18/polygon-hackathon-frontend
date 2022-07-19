import React from 'react'

const TextWithTopLine = ({children, fontSize, padding, fontWeight}) => {
  return (
    <div className="text-top-border" style={{padding}}>  <h2 style={{fontWeight,fontSize}}>{children}</h2> </div>
  )
}

export default TextWithTopLine