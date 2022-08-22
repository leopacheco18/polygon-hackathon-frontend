import React from 'react'

const TeamCard = ({isTop, img, name, role, targetLink}) => {

  const isMobile = () => window.matchMedia('(max-width: 800px)').matches

  const openInfo = () => {
    window.open(targetLink, '_blank');
  }

  return (
    <div className="team-card-container" onClick={openInfo} style={{marginTop: isTop && !isMobile() && '15%'}}>
        <img src={img} alt={name}  className="w-100" />
        <h3>{name}</h3>
        <small style={{ textAlign : 'center'}}>{role}</small>
    </div>
  )
}

export default TeamCard