import { Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { FaHandHoldingHeart } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import {
  CloseOutlined,
  UserOutlined,
  FileTextFilled,
  MailOutlined,
  CloseCircleFilled,
} from "@ant-design/icons";
import logoShort from "../../assets/logo/logo_D_big.png";
import CustomDropzone from "../global/CustomDropzone";
import countryList from "../../assets/json/countries.json";
import { toast } from "react-toastify";
import useHttp from "../../hooks/useHttp";
import { useMoralis } from "react-moralis";

const errors = {
  name: "Name",
  email: "Email",
  country: "Country",
  description: "Description",
  image: "Profile Image",
};

const ModalFoundation = ({ isCollapsed }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileInfo, setFileInfo] = useState([]);
  const [hideRegister, setHideRegister] = useState(false);
  const { user } = useMoralis();
  const { request } = useHttp();
  const [formFoundation, setFormFoundation] = useState({
    name: "",
    email: "",
    country: "",
    description: "",
    image: "",
    ethAddress: user.get("ethAddress"),
  });

  useEffect(() => {
    if (fileInfo.length > 0) {
      console.log(fileInfo[0].file)
      getBase64(fileInfo[0].file);
    } else {
      setFormFoundation({ ...formFoundation, image: "" });
    }
  }, [fileInfo]);

  useEffect(() => {
    if (user && user.get("ethAddress")) {
      isFoundation();
    }
  }, [user]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    setFormFoundation({ ...formFoundation, [e.target.name]: e.target.value });
  };

  const getBase64 = (file)  => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setFormFoundation({...formFoundation, image: reader.result})
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }
 

  const saveFoundation = async () => {
    if (hideRegister) return;
    let error = false;
    let errorMessage = "";
    Object.keys(formFoundation).forEach((item) => {
      if (!formFoundation[item]) {
        error = true;
        errorMessage = errors[item] + " is obligatory";
      }
    });
    if (error) {
      toast.error(errorMessage);
      return;
    }
    let configRequest = {
      type: "post",
      endpoint: "foundation/create-foundation",
      data: { ...formFoundation },
    };
    const response = await request(configRequest);
    if (response.success) {
      isFoundation();
      toast.success(
        "Foundation " + formFoundation.name + " have been created successfuly"
      );
      handleCancel();
    }
  };

  const isFoundation = async () => {
    let configRequest = {
      type: "get",
      endpoint: "foundation/get-foundation-by-wallet/" + user.get("ethAddress"),
      data: {},
    };
    const response = await request(configRequest);
    if (response.success) {
      setHideRegister(true);
    }
  };

  if (hideRegister) {
    return (
      <>
        <hr /> <br />
      </>
    );
  }

  return (
    <div>
      <div
        className="d-flex justify-center cursor-pointer "
        onClick={showModal}
      >
        <div className="w-80 route-border">
          <div
            className={`d-flex flex-row route w-100 ${
              isCollapsed ? "route-logo-small route-logo-small-center" : ""
            }`}
          >
            <div className="route-logo">
              <FaHandHoldingHeart />
            </div>
            {!isCollapsed && (
              <div className="route-title">Register your foundation</div>
            )}
          </div>
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
            <div className="d-flex justify-center align-center h-100">
              <div className="modal-foundation-form">
                <img src={logoShort} alt="logo-short" />
                <h3>REGISTER YOUR FOUNDATION</h3>
                <Input
                  name="name"
                  onChange={handleChange}
                  placeholder="Name..."
                  prefix={<UserOutlined />}
                />
                <Input
                  name="email"
                  onChange={handleChange}
                  placeholder="Email..."
                  prefix={<MailOutlined />}
                />
                <div className="form-group">
                  <div className="prefix">
                    <BiWorld />
                  </div>

                  <Select
                    placeholder="Country..."
                    className="w-100"
                    onChange={(e) =>
                      setFormFoundation({ ...formFoundation, country: e })
                    }
                  >
                    {Object.keys(countryList).map((key, index) => (
                      <Select.Option value={key} key={index}>
                        {countryList[key]}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
                <Input.TextArea
                  name="description"
                  onChange={handleChange}
                  rows={4}
                  placeholder="Description / Foundation Cause..."
                  prefix={<FileTextFilled />}
                />
                {fileInfo.length > 0 ? (
                  <>
                    <div className="position-relative modal-foundation-form-image">
                      <img
                        src={fileInfo[0].file.preview}
                        alt="profile-preview"
                      />
                      <CloseCircleFilled
                        className="modal-foundation-form-image-remove"
                        onClick={() => setFileInfo([])}
                      />
                    </div>
                  </>
                ) : (
                  <CustomDropzone setFileInfo={setFileInfo} />
                )}

                <button onClick={saveFoundation}> Register</button>
              </div>
            </div>
          </div>
          <div className="w-50 modal-foundation-image"></div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalFoundation;
