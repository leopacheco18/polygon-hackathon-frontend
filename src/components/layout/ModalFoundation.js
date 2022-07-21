import { Input, Modal } from "antd";
import React, { useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import {BiWorld} from "react-icons/bi"
import { CloseOutlined,UserOutlined, FileTextFilled , MailOutlined } from '@ant-design/icons';
import logoShort from "../../assets/logo/logo_D_big.png";

const ModalFoundation = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <div className="d-flex justify-center cursor-pointer" onClick={showModal}>
        <div className={`d-flex flex-row route w-80 route-border`}>
          <div className="route-logo">
            <AiOutlineFileAdd />
          </div>
          <div className="route-title">Register your foundation</div>
        </div>
      </div>
      <Modal
        title=""
        visible={isModalVisible}
        onCancel={handleCancel}
        closable={false}
        footer={null}
        className="modal-foundation-container"
      >
        <div className="d-flex">
          <div className="w-50 position-relative">
            <div className="modal-foundation-close" onClick={handleCancel}>
            <CloseOutlined />
            </div>
            <div  className="d-flex justify-center align-center h-100">
            <div className="modal-foundation-form">
                <img src={logoShort} alt="logo-short" />
                <h3>REGISTER YOUR FOUNDATION</h3>
                <Input placeholder="Name..." prefix={<UserOutlined />} />
                <Input prefix={<MailOutlined />} />
                <Input prefix={<BiWorld />} />
                <Input prefix={<FileTextFilled />} />
            </div>
            </div>
          </div>
          <div className="w-50 modal-foundation-image">
          </div>
          
        </div>
      </Modal>
    </div>
  );
};

export default ModalFoundation;
