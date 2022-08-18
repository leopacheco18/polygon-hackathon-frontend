import { Modal } from 'antd'
import React from 'react'
import {
    CloseOutlined
  } from "@ant-design/icons";
  import { AiFillCalendar } from "react-icons/ai";

const ModalPost = ({isModalVisible, handleCancel, post, foundation}) => {
    
  const getDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  return (
    
    <Modal
    centered
    title=""
    visible={isModalVisible}
    onCancel={handleCancel}
    closable={false}
    footer={null}
    className="modal-foundation-container"
  >
    <div className="d-flex">
      <div className="w-50 modal-post-img-container position-relative">
      <img src={post?.image} alt="img-nft" className="w-100" />
        <div className="modal-foundation-close" onClick={handleCancel}>
          <CloseOutlined />
        </div>
      </div>
      <div className="w-50 ">
        <div className="modal-post-content-container">
            <div className='modal-post-content-header'> 
                <img src={foundation?.image} alt='profile' />
                <p> {foundation?.name} </p>
            </div>
            <div className='modal-post-content-description'>
                <h4> {post?.title} </h4>
                <p> {post?.description} </p>
            </div>
            <div className="d-flex justify-end align-center posts-date">
                <AiFillCalendar className="posts-date-icon" />
                <div className="posts-date-day">Published on  {getDate(post?.createdAt)}</div>
              </div>
        </div>
      </div>
    </div>
  </Modal>
  )
}

export default ModalPost