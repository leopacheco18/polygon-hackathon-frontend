import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import Loading from "../global/Loading";
import TextWithTopLine from "../global/TextWithTopLine";
import { RiFootprintFill } from "react-icons/ri";

import { BsCalendar2EventFill } from "react-icons/bs";
import { CloseCircleFilled } from "@ant-design/icons";
import DarkButton from "../global/DarkButton";

const Steps = ({ setShowSteps, showSteps }) => {
  const [arrSteps, setArrSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const { request } = useHttp();

  useEffect(() => {
    getSteps();
  }, []);

  const getSteps = async () => {
    setLoading(true);
    let configRequest = {
      type: "get",
      endpoint: `cause/get-steps-by-address/${showSteps.contractAddress}`,
    };
    const response = await request(configRequest);
    setLoading(false);
    if (response.success) {
      setArrSteps(response.steps);
    }
  };

  return (
    <div>
      {loading && <Loading />}
      <TextWithTopLine padding={"1rem 0"} fontSize="1.25rem" fontWeight={600}>
        Create Cause 
      </TextWithTopLine>
      <div className="d-flex">
        <div className="w-65 about-us-card step-list-left">
          <h2>Steps List</h2>
          <hr /> <br />
          {arrSteps.map((item, index) => (
            <div
              key={index}
              className={`step-container ${
                index === stepIndex && "step-selected"
              }`}
              onClick={() => setStepIndex(index)}
            >
              <RiFootprintFill />
              {showSteps.steps === "1"
                ? "Week"
                : showSteps.steps === "4"
                ? "Month"
                : "Quarterly"}
              {index + 1}
            </div>
          ))}
        </div>
        <div className="w-35 about-us-card step-list-right">
          <h2>Steps List</h2>
          <hr /> <br />
          <h2>Step Description</h2>
          <p> {arrSteps[stepIndex]?.description} </p><br />
          <hr /> <br />
          <div className="d-flex flex-row justify-space-between cause-date">
            <div className="cause-date-initial">
              <div className="mb-5">Initial Date</div>
              <div className="d-flex align-center cause-date-info">
                <BsCalendar2EventFill className="cause-date-icons" />
                {arrSteps[stepIndex]?.initialDate}
              </div>
            </div>
            <div className="d-flex align-center cause-date-progress">
                <hr className="w-100" />
            </div>
            <div className="cause-date-finish">
              <div className="mb-5">Due Date</div>
              <div className="d-flex align-center cause-date-info">
                <BsCalendar2EventFill className="cause-date-icons" />
                {arrSteps[stepIndex]?.dueDate}
              </div>
            </div>
          </div>
          <div className="d-flex justify-end add-new-post-buttons">
            <DarkButton
              onClick={() => setShowSteps(false)}
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
  );
};

export default Steps;
