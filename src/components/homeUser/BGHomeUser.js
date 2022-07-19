import React from 'react'
import banner from "./../../assets/homeUser/banner.png"

const BGHomeUser = () => {
  return (
    <div className='bg-home-user w-100' style={{backgroundImage: "url("+banner+")"}}>
        <div className="bg-home-diagonal"></div>
        <div className="bg-home-content"></div>
    </div>
  )
}

export default BGHomeUser