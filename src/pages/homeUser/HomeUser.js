import React, { useEffect } from 'react'

import './HomeUser.css'

import NewestNFT from '../../components/homeUser/NewestNFT';

import SpaceMan from "../../assets/homeUser/spaceman.png"
import CreativeCar from "../../assets/homeUser/creative_car.png"
import InclusionProblem from "../../assets/homeUser/inclusion_problem.png"
import Amount from "../../assets/homeUser/logo-amount.png"
import LogoFoundationSpaceMan from "../../assets/homeUser/logo-foundation-1.png"
import LogoFoundationCreativeCar from "../../assets/homeUser/logo-foundation-2.png"
import LogoFoundationInclusionProblem from "../../assets/homeUser/logo-foundation-3.png"

const nfts = [
  { img: SpaceMan, title: "Spaceman", price: 30, logo_price: Amount, logo_foundation: LogoFoundationSpaceMan, name_foundation: 'Astrology Foundation', status: true },
  { img: CreativeCar, title: "Creative Car", price: 55, logo_price: Amount, logo_foundation: LogoFoundationCreativeCar, name_foundation: 'Cars Population Charity', status: false },
  { img: InclusionProblem, title: "Inclusion Problem", price: 185, logo_price: Amount, logo_foundation: LogoFoundationInclusionProblem, name_foundation: 'Social Inclusion Causes', status: true }
];

const HomeUser = () => {

  useEffect(() => {

    // call function get newest nfts and save that in a variable

  }, [])

  return (
    <div className='container'>

      <NewestNFT nfts={nfts} />

    </div>
  )
}

export default HomeUser