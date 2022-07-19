import React from 'react'
import banner from "./../../assets/homeUser/banner.png"

const BGHomeUser = () => {
  return (
    <div className='bg-home-user w-100' style={{backgroundImage: "url("+banner+")"}}>
        <div className="bg-home-diagonal"></div>
        <div className="bg-home-content">
            <h2>Trust</h2>
            <h2>Selflessness</h2>
            <h2>Transparency</h2>
        </div>
    </div>
  )
}

export default BGHomeUser