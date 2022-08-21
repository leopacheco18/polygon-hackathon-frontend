import React, { useEffect, useState } from "react";

import {
  BsCalendar2EventFill,
  BsFillDiamondFill,
  BsFillEyeFill,
  BsFillHandIndexFill,
} from "react-icons/bs";

import useHttp from "../../hooks/useHttp";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import DarkButton from "../global/DarkButton";
import abiFactoryMarket from "../../assets/json/abiFactoryMarket.json";
import abiFactoryDao from "../../assets/json/abiFactoryDao.json";
import abiFactoryTimeLock from "../../assets/json/abiFactoryTimeLock.json";
import abiFactoryRoles from "../../assets/json/abiFactoryRoles.json";
import Loading from "../global/Loading";
import { toast } from "react-toastify";
import { message } from "antd";
import abiMarketPlace from "../../assets/json/abiMarketPlace.json";
import Amount from "../../assets/homeUser/logo-amount.png";

const weekTime = 17280;

const SupportCause = ({
  setShowAddNft,
  foundation,
  setShowSteps,
  setShowNFT,
}) => {
  
  const isMobile = () => window.matchMedia("(max-width: 800px)").matches;
  const [cause, setCause] = useState([]);
  const { user, enableWeb3 } = useMoralis();
  const [loading, setLoading] = useState(false);
  const { request } = useHttp();
  const { Moralis } = useMoralis();
  const { fetch } = useWeb3ExecuteFunction();


  const calculatePercentageProgress = (goal, actual) => {
    return (100 * actual / goal);
  };

  useEffect(() => {
    getCauses();
  }, []);

  const getCauses = async () => {
    setLoading(true);
    let configRequest = {
      type: "post",
      endpoint: `cause/get-cause-by-wallet/${foundation.ethAddress}`,
      data: {
        ethAddress: user.get("ethAddress"),
      },
    };
    const response = await request(configRequest);
    if (response.success) {
      await enableWeb3();
      for (let i = 0; i < response.causes.length; i++) {
        if (response.causes[i].marketAddress) {
          const readOptions = {
            contractAddress: response.causes[i].marketAddress,
            functionName: "getBalance",
            abi: abiMarketPlace,
          };
          let balance = await Moralis.executeFunction(readOptions);
          response.causes[i].balance = Moralis.Units.FromWei(balance._hex);
          if(parseFloat(response.causes[i].balance) >= parseFloat(response.causes[i].goal) ){
            response.causes[i].progress = 100
          }else{

            response.causes[i].progress = calculatePercentageProgress(
              parseFloat(response.causes[i].goal),
              response.causes[i].balance
            );
          }
        }
      }
      setCause(response.causes);
    }
    setLoading(false);
  };

  const handleCreateTimeLock = async (item) => {
    setLoading(true);
    await enableWeb3();
    let options = {
      abi: abiFactoryTimeLock,
      contractAddress: "0x7886918cd88c4fAE7fE6ABE3A1b8489AD97c4EB2",
      functionName: "createNewTimeLock",
      params: {
        _minDelay: 2,
        _proposers: [],
        _executors: [],
        _nftContract: item.contractAddress,
      },
    };
    fetch({
      params: options,
      onSuccess: (r) => {
        if (r) {
          setLoading(false);
          toast.success("Your timelock have been created successfully.");
        }
      },
      onError: (error) => {
        setLoading(false);
        message.error(error.message);
      },
    });
  };

  const handleCreateDao = async (item) => {
    setLoading(true);
    await enableWeb3();


    let votingDuration = weekTime * parseInt(item.steps);

    let options = {
      abi: abiFactoryDao,
      contractAddress: "0x3Caa2c8c43F36EEba4B7A95F155aB20De39595C5",
      functionName: "createNewDao",
      params: {
        _token: item.contractAddress,
        _timelock: item.timelockAddress,
        nftContract: item.contractAddress,
        initVotingDelay: 1,
        initVotingPeriod: votingDuration,
        proposalThreshhold: 0,
      },
    };
    fetch({
      params: options,
      onSuccess: (r) => {
        if (r) {
          setLoading(false);
          toast.success("Your Dao have been created successfully.");
        }
      },
      onError: (error) => {
        console.log(error)
        setLoading(false);
        message.error(error.message);
      },
    });
  };

  const handleAddRoles = async (item) => {
    setLoading(true);
    await enableWeb3();
    let optionsRole1 = {
      abi: abiFactoryRoles,
      contractAddress: item.timelockAddress,
      functionName: "PROPOSER_ROLE",
    };

    let optionsRole2 = {
      abi: abiFactoryRoles,
      contractAddress: item.timelockAddress,
      functionName: "EXECUTOR_ROLE",
    };
    let optionsRole3 = {
      abi: abiFactoryRoles,
      contractAddress: item.timelockAddress,
      functionName: "CANCELLER_ROLE",
    };

    const role1 = await fetch({ params: optionsRole1 });
    const role2 = await fetch({ params: optionsRole2 });
    const role3 = await fetch({ params: optionsRole3 });
    console.log(role1);

    let options = {
      abi: abiFactoryTimeLock,
      contractAddress: "0x7886918cd88c4fAE7fE6ABE3A1b8489AD97c4EB2",
      functionName: "addRole",
      params: {
        role: [role1, role2, role3],
        account: item.daoAddress,
        timelock: item.timelockAddress,
        nftContract: item.contractAddress,
      },
    };
    fetch({
      params: options,
      onSuccess: (r) => {
        if (r) {
          setLoading(false);
          toast.success("Your Dao have been created successfully.");
        }
      },
      onError: (error) => {
        setLoading(false);
        message.error(error.message);
      },
    });
  };

  const handleCreateMarket = async (item) => {
    setLoading(true);
    await enableWeb3();
    let options = {
      abi: abiFactoryMarket,
      contractAddress: "0x8D2c452DaA9e64903598E305677E7e50369fB7b4",
      functionName: "createNewMarketPlace",
      params: {
        _ownerDao: item.daoAddress,
        nftContract: item.contractAddress,
      },
    };
    fetch({
      params: options,
      onSuccess: (r) => {
        if (r) {
          setLoading(false);
          toast.success("Your MarketPlace have been created successfully.");
        }
      },
      onError: (error) => {
        setLoading(false);
        console.log(error);
        message.error(error.message);
      },
    });
  };

  
  const handleCreatePropose = async (item) => {

    await enableWeb3();
    const ethers = Moralis.web3Library;

    const daiAddress = item.marketAddress;
    const daiAbi = abiMarketPlace;
    const daiContract = new ethers.Contract(daiAddress, daiAbi);

    const name = daiContract.interface.encodeFunctionData('sendBalanceToOrganization',[user.get('ethAddress')]);

    setLoading(true);
    let options = {
      abi: abiFactoryDao,
      contractAddress: '0x3Caa2c8c43F36EEba4B7A95F155aB20De39595C5',
      functionName: "proposeVotation",
      params: {
        targets: [item.marketAddress],
        values: [0],
        calldatas: [name],
        description: 'Proposal Description',
        nftAddress: item.contractAddress,
        daoAddress: item.daoAddress
      },
    };
    fetch({
      params: options,
      onSuccess: (r) => {
        console.log(r)
        if (r) {
          setLoading(false);
          toast.success("Your Proposal have been created successfully.");
        }
      },
      onError: (error) => {
        setLoading(false);
        console.log(error);
        message.error(error.message);
      },
    });
  };


  return (
    <>
      {loading && <Loading />}
      {cause.map((item, index) => (
        <div
          key={index}
          className="container d-flex flex-row align-center cause-card"
        >
          {!item.timelockAddress && (
            <DarkButton
              className={"add-smart-contract"}
              fontSize={"1rem"}
              padding="0.5rem 1rem"
              borderRadius={"5px"}
              onClick={() => handleCreateTimeLock(item)}
            >
              Init TimeLock
            </DarkButton>
          )}

          {item.timelockAddress && !item.daoAddress && (
            <DarkButton
              className={"add-smart-contract"}
              fontSize={"1rem"}
              padding="0.5rem 1rem"
              borderRadius={"5px"}
              onClick={() => handleCreateDao(item)}
            >
              Init Dao
            </DarkButton>
          )}

          {item.timelockAddress && item.daoAddress && !item.roleGranted && (
            <DarkButton
              className={"add-smart-contract"}
              fontSize={"1rem"}
              padding="0.5rem 1rem"
              borderRadius={"5px"}
              onClick={() => handleAddRoles(item)}
            >
              Add Roles
            </DarkButton>
          )}

          {item.timelockAddress &&
            item.daoAddress &&
            item.roleGranted &&
            !item.marketAddress && (
              <DarkButton
                className={"add-smart-contract"}
                fontSize={"1rem"}
                padding="0.5rem 1rem"
                borderRadius={"5px"}
                onClick={() => handleCreateMarket(item)}
              >
                Init MarketPlace
              </DarkButton>
            )}

            {item.timelockAddress &&
            item.daoAddress &&
            item.roleGranted &&
            item.marketAddress &&
            !item.proposalId && 
              user.get('ethAddress') === item.nftArtist
            &&
<DarkButton
            className={"add-smart-contract"}
            fontSize={"1rem"}
            padding="0.5rem 1rem"
            borderRadius={"5px"}
            onClick={() => handleCreatePropose(item)}
          >
            Init Propose
          </DarkButton>


            }

          <div className="w-30 cause-logo">
            <img
              className="w-100"
              src={item.ipfsImage}
              alt="support-cause-logo"
            />
          </div>

          <div className="w-70 d-flex flex-column cause-information">
            <div className="cause-title">
              Cause: <span className="cause-title-principal">{item.title}</span>
            </div>

            <div className="cause-final-goal">
              Final Goal :{" "}
              <span className="cause-final-goal-principal">{item?.goal} </span>{" "}
              <img
                className="nft-price-actual-price-image"
                src={Amount}
                alt="logo-price"
              />
            </div>

            {item.balance && (
              <div className="cause-total-collected">
                Total Collected :{" "}
                <span className="cause-total-collected-principal">
                  {item.balance}{" "}
                </span>{" "}
                <img
                  className="nft-price-actual-price-image"
                  src={Amount}
                  alt="logo-price"
                />
              </div>
            )}

            {item.balance && (
              <div className="total-goal-bar position-relative">
                <div className="price-on-progress-bar">{item.progress} %</div>
                <div
                  className="my-actual-progress-bar d-flex justify-center align-center"
                  style={{ width: item.progress + "%" }}
                ></div>
              </div>
            )}

            <div className="d-flex flex-row justify-space-between cause-date">
              <div className="cause-date-initial">
                <div className="mb-5">Initial Date</div>
                <div className="d-flex align-center cause-date-info">
                  <BsCalendar2EventFill className="cause-date-icons" />
                  {item?.initialDate}
                </div>
              </div>
              {!isMobile() && 
              
              <div className="d-flex align-center cause-date-progress">
                <hr className="w-100" />
              </div>
              }

              <div className="cause-date-finish">
                <div className="mb-5">Due Date</div>
                <div className="d-flex align-center cause-date-info">
                  <BsCalendar2EventFill className="cause-date-icons" />
                  {item?.dueDate}
                </div>
              </div>
            </div>

            {item.timelockAddress && item.daoAddress && item.marketAddress && (
              <div className="d-flex justify-center justify-space-between cause-bottoms">
                <button
                  className="w-30 d-flex justify-center align-center cause-bottom"
                  onClick={() => setShowAddNft(item)}
                >
                  <BsFillHandIndexFill className="cause-bottom-icon" />
                  Support
                </button>
                <button
                  className="w-30 d-flex justify-center align-center cause-bottom"
                  onClick={() => setShowSteps(item)}
                >
                  <BsFillEyeFill className="cause-bottom-icon" />
                  View Steps
                </button>
                <button
                  className="w-30 d-flex justify-center align-center cause-bottom"
                  onClick={() => setShowNFT(item)}
                >
                  <BsFillDiamondFill className="cause-bottom-icon" />
                  View NFTs
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default SupportCause;
