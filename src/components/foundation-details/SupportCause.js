import React, { useEffect, useState } from 'react'

import {  BsCalendar2EventFill, BsFillDiamondFill, BsFillEyeFill, BsFillHandIndexFill } from "react-icons/bs";

import useHttp from '../../hooks/useHttp';

const SupportCause = ({setShowAddNft, foundation, setShowSteps, setShowNFT}) => {

  const [cause, setCause] = useState([]);
  const { request } = useHttp();


  // const calculatePercentageProgress = (goal, actual) => {
  //   return (100 * parseInt(actual)) / parseInt(goal)
  // }

  useEffect(() => {

    // const percentageProgress = calculatePercentageProgress('2000', '1100')

    getCauses()
  }, [])


  const getCauses = async () => {
    let configRequest = {
      type: "get",
      endpoint: `cause/get-cause-by-wallet/${foundation.ethAddress}`,
    };
    const response = await request(configRequest);
    if (response.success) {
      setCause(response.causes);
    }
  }


  return (
    <>
    {cause.map((item, index) => (
      <div key={index} className='container d-flex flex-row align-center cause-card'>

      <div className='w-30 cause-logo'>
        <img className='w-100' src={item.ipfsImage} alt="support-cause-logo" />
      </div>

      <div className='w-70 d-flex flex-column cause-information'>

        <div className='cause-title'>
          Cause: <span className='cause-title-principal'>{item.title}</span>
        </div>

        <div className='cause-final-goal'>
          Final Goal : <span className='cause-final-goal-principal'>{item?.goal}$</span>
        </div>

        {/* <div className='cause-total-collected'>
          Total Collected : <span className='cause-total-collected-principal'>{cause?.totalCollected}$</span>
        </div> */}

        {/* <div className='total-goal-bar'>
          <div
            className='my-actual-progress-bar d-flex justify-center align-center'
            style={{ width: cause?.progressBar + '%' }}
          >
            {cause?.progressBar > 20 && cause?.totalCollected + '$'}
          </div>
        </div> */}

        <div className='d-flex flex-row justify-space-between cause-date'>

          <div className='cause-date-initial'>
            <div className='mb-5'>
              Initial Date
            </div>
            <div className='d-flex align-center cause-date-info'>
              <BsCalendar2EventFill className='cause-date-icons' />
              {item?.initialDate}
            </div>
          </div>

          <div className='d-flex align-center cause-date-progress'>
          <hr className="w-100" />
          </div>

          <div className='cause-date-finish'>
            <div className='mb-5'>
              Due Date
            </div>
            <div className='d-flex align-center cause-date-info'>
              <BsCalendar2EventFill className='cause-date-icons' />
              {item?.dueDate}
            </div>
          </div>

        </div>

        <div className='d-flex justify-center justify-space-between cause-bottoms'>
          <button className='w-30 d-flex justify-center align-center cause-bottom' onClick={() =>setShowAddNft(item.contractAddress)}>
            <BsFillHandIndexFill className='cause-bottom-icon' />
            Support
          </button>
          <button className='w-30 d-flex justify-center align-center cause-bottom' onClick={() =>setShowSteps(item)}>
            <BsFillEyeFill className='cause-bottom-icon' />
            View Steps
          </button>
          <button className='w-30 d-flex justify-center align-center cause-bottom' onClick={() =>setShowNFT(item)} >
            <BsFillDiamondFill className='cause-bottom-icon' />
            View NFTs
          </button>
        </div>

      </div>

    </div>
    ))}
    </>
  )
}

export default SupportCause