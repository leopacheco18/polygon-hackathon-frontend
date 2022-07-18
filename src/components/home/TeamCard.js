import React from 'react'

const TeamCard = ({isTop, img, name, role}) => {

  return (
    <div className="team-card-container" style={{marginTop: isTop && '15%'}}>
        <img src={img} alt={name}  className="w-100" />
        <h3>{name}</h3>
        <small>{role}</small>
    </div>
  )
}

export default TeamCard