import React, { useEffect, useState } from "react";
import { Input, message, Select } from "antd";
import TextWithTopLine from "../global/TextWithTopLine";
import { PlusCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import GreenButton from "../global/GreenButton";
import { RiFootprintFill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import DarkButton from "../global/DarkButton";
import CustomDropzone from "../global/CustomDropzone";
import { toast } from "react-toastify";
import {
  useMoralis,
  useMoralisFile,
  useWeb3ExecuteFunction,
} from "react-moralis";

import abi from "../../assets/json/abiFactory.json";
import PolygonLogo from "../../assets/logo/polygon_logo.png";
import Loading from "../global/Loading";

const AddNewCause = ({ setShowAddCause }) => {
  const [fileInfo, setFileInfo] = useState([]);
  const { enableWeb3 } = useMoralis();
  const [showStepForm, setShowStepForm] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [stepForm, setStepForm] = useState([]);
  const [calculateStepForm, setCalculateStepForm] = useState(false);
  const { saveFile } = useMoralisFile();
  const { fetch } = useWeb3ExecuteFunction();
  const [loading, setLoading] = useState(false);
  const [newCauseForm, setNewCauseForm] = useState({
    title: "",
    goal: 0,
    initialDate: null,
    dueDate: null,
    duration: null,
    stepDivition: null,
    image: null,
  });
  useEffect(() => {
    if (fileInfo.length > 0) {
      getBase64(fileInfo[0].file);
    } else {
      setNewCauseForm({ ...newCauseForm, image: "" });
    }
  }, [fileInfo]);

  const getBase64 = (file) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setNewCauseForm({ ...newCauseForm, image: reader.result });
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const handleChange = (e) => {
    setNewCauseForm({ ...newCauseForm, [e.target.name]: e.target.value });
  };

  const capitalizeTitle = (txt) => {
    var input = txt;
    var output = input.replace(/\w+/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1);
    });
    return output;
  };

  const getSymbol = (txt) => {
    var strings = txt;
    var i = 0;
    var character = "";
    var symbol = "";
    while (i <= strings.length) {
      character = strings.charAt(i);
      if (character === character.toUpperCase()) {
        symbol += character;
      }
      i++;
    }
    return symbol;
  };

  const handleSubmit = async () => {
    let isValid = true;
    stepForm.forEach((item) => {
      if (!item.description) {
        isValid = false;
      }
    });
    if (!isValid) {
      message.error("Step description is required in all steps");
      return;
    }
    setLoading(true);
    saveFile(newCauseForm.title + "_preview.jpeg", fileInfo[0].file, {
      type: "base64",
      saveIPFS: true,
      onSuccess: async (data) => {
        await enableWeb3();
        let dataToSave = {};
        let name = capitalizeTitle(newCauseForm.title);
        let symbol = getSymbol(name);

        let arrDate = [],
          arrDueDate = [],
          arrDescription = [];

        stepForm.forEach((item) => {
          arrDate.push(item.initialDate);
          arrDueDate.push(item.dueDate);
          arrDescription.push(item.description);
        });

        dataToSave._nftName = name;
        dataToSave._tokenName = symbol;
        dataToSave._goal = parseFloat(newCauseForm.goal);
        dataToSave._stepsInitialDate = arrDate;
        dataToSave._stepsDueDate = arrDueDate;
        dataToSave._descriptionSteps = arrDescription;
        dataToSave._title = newCauseForm.title;
        dataToSave._initialDate = newCauseForm.initialDate;
        dataToSave._dueDate = newCauseForm.dueDate;
        dataToSave._duration = parseInt(newCauseForm.duration);
        dataToSave._stepDivision = parseInt(newCauseForm.stepDivition);
        dataToSave._ipfsImage = data.ipfs();
        // let songsMetadata = [...metadataAllIPFS];
        let options = {
          abi: abi,
          contractAddress: "0xD2a1b54a585e12be61B24101CD864b51dF348232",
          functionName: "createNFTContract",
          params: dataToSave,
        };
        fetch({
          params: options,
          onSuccess: (r) => {
            if (r) {
              setLoading(false);
              toast.success("Your cause have been created successfully.");
              setTimeout(() => {
                setShowAddCause(false);
              }, 3000);
            }
          },
          onError: (error) => {
            setLoading(false);
            message.error(error.message);
          },
        });
      },
      onError: (error) => {
        setLoading(false);
        message.error("Ups.. something went wrong");
      },
    });
  };

  const showStepPlaning = () => {
    if (
      newCauseForm.duration &&
      newCauseForm.goal &&
      newCauseForm.initialDate &&
      newCauseForm.stepDivition &&
      newCauseForm.title &&
      newCauseForm.image
    ) {
      setShowStepForm(true);
      setCalculateStepForm(true);
    } else {
      message.error(
        "Image, Title, Goal, Initial Date, Duration and Step Divition are required fields."
      );
    }
  };

  const addDays = (days) => {
    var result = new Date(newCauseForm.initialDate);
    result = new Date(
      result.getTime() + Math.abs(result.getTimezoneOffset() * 60000)
    );
    result.setDate(result.getDate() + days);
    return result.toISOString().split("T")[0];
  };

  const calculateEnd = (duration) => {
    let dueDate = addDays(duration * 7);

    setNewCauseForm({
      ...newCauseForm,
      dueDate,
      duration: duration,
      stepDivition: null,
    });
  };

  const renderSteps = () => {
    let listToReturn = [];
    let lengthSteps = newCauseForm.duration / newCauseForm.stepDivition;
    let labelStep =
      newCauseForm.stepDivition === 1
        ? "Week"
        : newCauseForm.stepDivition === 4
        ? "Month"
        : "Quarterly";
    let auxStepForm = [...stepForm];
    for (let i = 0; i < lengthSteps; i++) {
      auxStepForm[i] = {
        description: "",
        initialDate: addDays(i * 7 * newCauseForm.stepDivition),
        dueDate: addDays((i + 1) * 7 * newCauseForm.stepDivition),
      };
      listToReturn.push(
        <div
          key={i}
          className={`step-container ${i === stepIndex && "step-selected"}`}
          onClick={() => setStepIndex(i)}
        >
          <RiFootprintFill /> {labelStep} {i + 1}{" "}
        </div>
      );
    }
    if (calculateStepForm) {
      setStepForm(auxStepForm);
      setCalculateStepForm(false);
    }

    return listToReturn;
  };

  const changeStepDescription = (e) => {
    let auxStepForm = [...stepForm];
    auxStepForm[stepIndex].description = e.target.value;
    setStepForm(auxStepForm);
  };

  return (
    <div>
      {loading && <Loading />}
      <TextWithTopLine padding={"1rem 0"} fontSize="1.25rem" fontWeight={600}>
        Create Cause
      </TextWithTopLine>
      {showStepForm ? (
        <div className="d-flex">
          <div className="w-30 about-us-card">
            <h2>Steps List</h2>
            <hr /> <br />
            {renderSteps()}
          </div>
          <div className="w-5"></div>
          <div className="w-65 about-us-card">
            <div className="add-post-form">
              <Input.TextArea
                name="description"
                onChange={changeStepDescription}
                value={stepForm[stepIndex]?.description}
                className="add-post-title add-post-description"
                rows={4}
                placeholder="Step description *"
              />

              {stepForm[stepIndex]?.initialDate && (
                <>
                  <label className="label-disabled">Initial Date</label>
                  <Input
                    value={stepForm[stepIndex]?.initialDate}
                    type="date"
                    className="add-post-title add-post-title-margin"
                    disabled
                  />
                </>
              )}
              {stepForm[stepIndex]?.dueDate && (
                <>
                  <label className="label-disabled">Due Date</label>
                  <Input
                    value={stepForm[stepIndex]?.dueDate}
                    type="date"
                    className="add-post-title add-post-title-margin"
                    disabled
                  />
                </>
              )}
              <div className="d-flex justify-end add-new-post-buttons">
                <GreenButton onClick={handleSubmit}>
                  <div className="add-new-post-cancel">
                    <div className="d-flex align-center">
                      <MdModeEdit />
                    </div>
                    Publish
                  </div>
                </GreenButton>
                <DarkButton
                  onClick={() => setShowStepForm(false)}
                  fontWeight={300}
                  fontSize={"1rem"}
                  padding="5px 10px 5px 5px"
                  borderRadius={"10px"}
                >
                  <div className="add-new-post-cancel">
                    <div className="d-flex align-center">
                      <CloseCircleFilled />
                    </div>
                    Cancel
                  </div>
                </DarkButton>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex about-us-card w-100">
          <div className="w-30">
            {fileInfo.length > 0 ? (
              <>
                <div className="add-post-new-preview">
                  <div className="position-relative">
                    <img src={fileInfo[0].file.preview} alt="profile-preview" />
                    <CloseCircleFilled
                      className="modal-foundation-form-image-remove"
                      onClick={() => setFileInfo([])}
                    />
                  </div>
                </div>
              </>
            ) : (
              <CustomDropzone
                extraClass={"add-new-post-card"}
                labelToShow={<PlusCircleFilled />}
                setFileInfo={setFileInfo}
              />
            )}

            {/* <div className="add-new-post-card d-flex justify-center align-center">
          <PlusCircleFilled />
        </div> */}
          </div>
          <div className="w-5"></div>
          <div className="w-60">
            <div className="add-post-form">
              <Input
                name="title"
                onChange={handleChange}
                value={newCauseForm.title}
                className="add-post-title add-post-title-margin"
                placeholder="Cause title *"
              />
              <Input
                name="goal"
                type="number"
                step={1}
                value={newCauseForm.goal}
                onChange={handleChange}
                className="add-post-title-with-addon add-post-title-margin"
                placeholder="Cause Goal *"
                addonAfter={
                  <img
                    className="polygon-logo-new-cause"
                    src={PolygonLogo}
                    alt="Polygon logo"
                  />
                }
              />
              <Input
                name="initialDate"
                type="text"
                defaultValue={newCauseForm.initialDate}
                onChange={handleChange}
                className="add-post-title add-post-title-margin"
                placeholder="Initial Date *"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
              {newCauseForm.initialDate && (
                <Select
                  style={{ width: "100%" }}
                  className="add-post-select add-post-title-margin"
                  defaultValue={newCauseForm.duration}
                  placeholder="Duration *"
                  onChange={calculateEnd}
                >
                  <Select.Option value={4}>1 month (4 weeks) </Select.Option>
                  <Select.Option value={12}>3 months (12 weeks)</Select.Option>
                  <Select.Option value={24}>6 months (24 weeks)</Select.Option>
                  <Select.Option value={48}>12 months (48 weeks)</Select.Option>
                </Select>
              )}
              {newCauseForm.dueDate &&
                newCauseForm.initialDate &&
                newCauseForm.duration && (
                  <>
                    <label className="label-disabled">Due Date</label>
                    <Input
                      value={newCauseForm.dueDate}
                      type="text"
                      className="add-post-title add-post-title-margin"
                      disabled
                    />
                  </>
                )}
              {newCauseForm.duration && (
                <Select
                  style={{ width: "100%" }}
                  defaultValue={newCauseForm.stepDivition}
                  className="add-post-select add-post-title-margin"
                  placeholder="Steps Divition *"
                  value={newCauseForm.stepDivition}
                  onChange={(e) =>
                    setNewCauseForm({ ...newCauseForm, stepDivition: e })
                  }
                >
                  <Select.Option value={1}>Weekly</Select.Option>
                  {newCauseForm.duration !== 4 && (
                    <>
                      <Select.Option value={4}>
                        Monthly (Each 4 weeks)
                      </Select.Option>
                      {newCauseForm.duration !== 12 && (
                        <Select.Option value={12}>
                          Quarterly (Each 12 weeks)
                        </Select.Option>
                      )}
                    </>
                  )}
                </Select>
              )}
              <br /> <br />
              <div className="d-flex justify-end add-new-post-buttons">
                <GreenButton onClick={showStepPlaning}>
                  <div className="add-new-post-cancel">
                    <div className="d-flex align-center">
                      <RiFootprintFill />
                    </div>
                    Steps Planning
                  </div>
                </GreenButton>
                <DarkButton
                  onClick={() => setShowAddCause(false)}
                  fontWeight={300}
                  fontSize={"1rem"}
                  padding="5px 10px 5px 5px"
                  borderRadius={"10px"}
                >
                  <div className="add-new-post-cancel">
                    <div className="d-flex align-center">
                      <CloseCircleFilled />
                    </div>
                    Cancel
                  </div>
                </DarkButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewCause;
