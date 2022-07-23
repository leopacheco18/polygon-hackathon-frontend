import React, { useEffect, useState } from 'react'

import './Foundations.css'

import FoundationsList from '../../components/foundations/FoundationsList';

import useHttp from '../../hooks/useHttp';



const Foundations = () => {
  const {request} = useHttp();
  const [foundationsElements, setFoundationsElements] = useState([]);

  useEffect(() => {

    // call function get newest nfts and save that in a variable
    getFoundations();
  }, [])

  const getFoundations = async () => {
    let configRequest = {
      type: "get",
      endpoint: "foundation/get-foundations",
      data: {}
  }
    const response = await request(configRequest);
    if(response.success){
      setFoundationsElements(response.foundations)
    }
  }

  return (
    <div className='container'>
      <FoundationsList foundationsElements={foundationsElements}  />
    </div>
  )
}

export default Foundations