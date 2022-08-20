import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import Loading from "../global/Loading";
import TextWithTopLine from "../global/TextWithTopLine";
import { RiFootprintFill } from "react-icons/ri";

import { BsCalendar2EventFill } from "react-icons/bs";
import { CloseCircleFilled } from "@ant-design/icons";
import DarkButton from "../global/DarkButton";
import { useMoralis, useMoralisWeb3Api, useWeb3ExecuteFunction } from "react-moralis";
import abiDao from "../../assets/json/abiDao.json";
import { toast } from "react-toastify";
import { message } from "antd";

const Steps = ({ setShowSteps, showSteps }) => {
  const [arrSteps, setArrSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const { user , enableWeb3 , isAuthenticated} = useMoralis();
  const { fetch } = useWeb3ExecuteFunction();
  const { request } = useHttp();
  const [hasVote, setHasVote] = useState(true);
  const Web3Api = useMoralisWeb3Api();

  useEffect(() => {
    if(isAuthenticated){
      getSteps();
      if(showSteps.proposalId){
        checkVote()
      }
    }
  }, [isAuthenticated]);

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

  const vote = async (val) => {
    setLoading(true);
    await enableWeb3();


    let options = {
      abi: abiDao,
      contractAddress: showSteps.daoAddress,
      functionName: "castVoteWithReason",
      params: {
        proposalId: showSteps.proposalId,
        support: val,
        reason: 'This is my vote'
      },
    };
    fetch({
      params: options,
      onSuccess: (r) => {
        if (r) {
          setLoading(false);
          toast.success("Your Vote have been register successfully.");
        }
      },
      onError: (error) => {
        console.log(error)
        setLoading(false);
        message.error(error.message);
      },
    });
  }

  const dateBetween = () => {
    let dateFrom = arrSteps[stepIndex]?.initialDate;
    let dateTo  = arrSteps[stepIndex]?.dueDate;

    let from = new Date(dateFrom);  // -1 because months are from 0 to 11
    let to   = new Date(dateTo);
    let check = new Date();
    return check > from && check < to;
  }

  const checkVote = async () => {
    const web3 = await enableWeb3();
      if(web3){

        const optionsNFT = {
          address: showSteps.contractAddress,
          chain: "mumbai",
        };
        const nftOwners  = await Web3Api.token.getNFTOwners(optionsNFT);
        let total = 0;
        nftOwners.result.forEach(item => {
          if(item.owner_of === user.get('ethAddress')){
            total++;
          }
        })
        if(total > 0) {

          let options = {
            abi: abiDao,
            contractAddress: showSteps.daoAddress,
            functionName: "hasVoted",
            params: {
              proposalId: showSteps.proposalId,
              account: user.get('ethAddress')
            },
          };
          fetch({
            params: options,
            onSuccess: (r) => {
                setHasVote(r)
            },
            onError: (error) => {
              setLoading(false);
              console.log(error);
              message.error(error.message);
            },
          });
        }
        }

    

  }


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
          
          <hr /> <br />

          {showSteps.proposalId && dateBetween()  && !hasVote &&
          
          <div className="d-flex justify-center w-100 vote-buttons">
            <DarkButton onClick={() => vote(1)} padding={'0.35rem 2rem'} borderRadius='5px' fontSize={'0.9rem'} > Vote Yes</DarkButton>
            <DarkButton onClick={() => vote(0)} padding={'0.35rem 2rem'} borderRadius='5px' fontSize={'0.9rem'} > Vote No</DarkButton>
          </div>
          }
          <br />
          <br />
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
