import React, { useEffect, useState } from 'react'

import { BsCalendar2Event, BsCalendar2EventFill, BsFillDiamondFill, BsFillEyeFill, BsFillHandIndexFill, BsHandIndexThumb } from "react-icons/bs";

import SupportCauseImage from '../../assets/supportCauses/cause.png'

const SupportCause = () => {

  const [cause, setCause] = useState(null)


  const calculatePercentageProgress = (goal, actual) => {
    return (100 * parseInt(actual)) / parseInt(goal)
  }

  useEffect(() => {

    const percentageProgress = calculatePercentageProgress('2000', '1100')

    setCause({
      title: 'Get Food for Rescued Dogs',
      goal: '2000',
      totalCollected: '1100',
      dateInitial: 'July 10, 2022',
      dateFinish: 'Oct 22, 2022',
      progressBar: percentageProgress
    })
  }, [])



  return (
    <div className='container d-flex flex-row align-center cause-card'>

      <div className='w-30 cause-logo'>
        <img className='w-100' src={SupportCauseImage} alt="support-cause-logo" />
      </div>

      <div className='w-70 d-flex flex-column cause-information'>

        <div className='cause-title'>
          Cause: <span className='cause-title-principal'>{cause?.title}</span>
        </div>

        <div className='cause-final-goal'>
          Final Goal : <span className='cause-final-goal-principal'>{cause?.goal}$</span>
        </div>

        <div className='cause-total-collected'>
          Total Collected : <span className='cause-total-collected-principal'>{cause?.totalCollected}$</span>
        </div>

        <div className='total-goal-bar'>
          <div
            className='my-actual-progress-bar d-flex justify-center align-center'
            style={{ width: cause?.progressBar + '%' }}
          >
            {cause?.progressBar > 20 && cause?.totalCollected + '$'}
          </div>
        </div>

        <div className='d-flex flex-row justify-space-between cause-date'>

          <div className='cause-date-initial'>
            <div className='mb-5'>
              Initial Date
            </div>
            <div className='d-flex align-center cause-date-info'>
              <BsCalendar2EventFill className='cause-date-icons' />
              {cause?.dateInitial}
            </div>
          </div>

          <div className='d-flex align-center cause-date-progress'>
            ---------------------------------------------------->
          </div>

          <div className='cause-date-finish'>
            <div className='mb-5'>
              Due Date
            </div>
            <div className='d-flex align-center cause-date-info'>
              <BsCalendar2EventFill className='cause-date-icons' />
              {cause?.dateInitial}
            </div>
          </div>

        </div>

        <div className='d-flex justify-center justify-space-between cause-bottoms'>
          <button className='w-30 d-flex justify-center align-center cause-bottom'>
            <BsFillHandIndexFill className='cause-bottom-icon' />
            Support
          </button>
          <button className='w-30 d-flex justify-center align-center cause-bottom'>
            <BsFillEyeFill className='cause-bottom-icon' />
            View Steps
          </button>
          <button className='w-30 d-flex justify-center align-center cause-bottom'>
            <BsFillDiamondFill className='cause-bottom-icon' />
            View NFTs
          </button>
        </div>

      </div>

    </div>
  )
}

export default SupportCause