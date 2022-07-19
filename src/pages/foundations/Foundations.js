import React, { useEffect } from 'react'

import './Foundations.css'

import NewestNFT from '../../components/homeUser/NewestNFT';
import FoundationsList from '../../components/foundations/FoundationsList';

import Logo1 from '../../assets/foundation/1.png'
import Logo2 from '../../assets/foundation/2.png'
import Logo3 from '../../assets/foundation/3.png'
import Logo4 from '../../assets/foundation/4.png'
import Logo5 from '../../assets/foundation/5.png'
import Logo6 from '../../assets/foundation/6.png'


const foundationsElements = [
  { img: Logo1, name: 'Social Inclusion Cause', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged', location: 'Ecuador - Quito', },
  { img: Logo2, name: 'Social Inclusion Cause', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged', location: 'Ecuador - Quito', },
  { img: Logo3, name: 'Social Inclusion Cause', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged', location: 'Ecuador - Quito', },
  { img: Logo4, name: 'Social Inclusion Cause', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged', location: 'Ecuador - Quito', },
  { img: Logo5, name: 'Social Inclusion Cause', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged', location: 'Ecuador - Quito', },
  { img: Logo6, name: 'Social Inclusion Cause', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged', location: 'Ecuador - Quito', },
];

const Foundations = () => {

  useEffect(() => {

    // call function get newest nfts and save that in a variable

  }, [])

  return (
    <div className='container'>
      <FoundationsList foundationsElements={foundationsElements} />
    </div>
  )
}

export default Foundations