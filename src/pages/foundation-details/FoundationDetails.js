import React, { useEffect, useState } from "react";
import {
  useParams,
} from "react-router-dom";

import AboutAs from "../../components/foundation-details/AboutAs";
import Posts from "../../components/foundation-details/Posts";
import TextWithTopLine from "../../components/global/TextWithTopLine";

import "./FoundationDetails.css";

import useHttp from "../../hooks/useHttp";
import HeaderFoundation from "../../components/foundation-details/HeaderFoundation";
import { useMoralis } from "react-moralis";
import SupportCause from "../../components/foundation-details/SupportCause";
import AddPost from "../../components/foundation-details/AddPost";
import AddNft from "../../components/foundation-details/AddNft";
import AddNewCause from "../../components/foundation-details/AddNewCause";
import Steps from "../../components/foundation-details/Steps";
import NFTCause from "../../components/foundation-details/NFTCause";

const FoundationDetails = () => {
  let { address } = useParams();
  const [foundation, setFoundation] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const { user } = useMoralis();
  const { request } = useHttp();
  const [options, setOptions] = useState([]);
  const [showAddPost, setShowAddPost] = useState(false);
  const [showAddNft, setShowAddNft] = useState(false);
  const [showAddCause, setShowAddCause] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [showNFT, setShowNFT] = useState(false);

  const isMobile = () => window.matchMedia("(max-width: 800px)").matches;
  useEffect(() => {
    // call to get all profile of foundation
    if (!foundation) {
      getFoundationByAddress();
    } else {
      setOptions([
        {
          option: "About us",
          isActive: true,
          view: <AboutAs key={1} foundation={foundation} />,
        },
        {
          option: "Post",
          isActive: false,
          view: <Posts key={2} foundation={foundation} />,
        },
        {
          option: "Support the cause",
          isActive: false,
          view: <SupportCause setShowAddNft={setShowAddNft} key={3} foundation={foundation} setShowSteps={setShowSteps} setShowNFT={setShowNFT} />,
        },
      ]);
    }
  }, [foundation]);

  const getFoundationByAddress = async () => {
    let configRequest = {
      type: "get",
      endpoint: "foundation/get-foundation-by-wallet/" + address,
      data: {},
    };
    const response = await request(configRequest);
    if (response.success) {
      setFoundation(response.foundation);
      setIsOwner(user.get("ethAddress") === response.foundation.ethAddress);
    }
  };

  const setActive = (index) => {
    let arrAux = [...options];
    arrAux.forEach((item) => {
      item.isActive = false;
    });
    arrAux[index].isActive = true;
    setOptions(arrAux);
  };

  return (
    <div className="container">
      <HeaderFoundation
        foundation={foundation}
        isOwner={isOwner}
        setShowAddPost={setShowAddPost}
        showAddPost={showAddPost}
        setShowAddCause={setShowAddCause}
        showAddCause={showAddCause}
      />

      {showAddCause && <AddNewCause setShowAddCause={setShowAddCause} />}

      {showAddPost && <AddPost setShowAddPost={setShowAddPost} />}

      {showAddNft && <AddNft setShowAddNft={setShowAddNft} showAddNft={showAddNft} />}

      {showSteps && <Steps setShowSteps={setShowSteps} showSteps={showSteps} />}

      {showNFT && <NFTCause setShowNFT={setShowNFT} showNFT={showNFT} />}

      {!showAddCause && !showNFT && !showSteps && !showAddNft && !showAddPost && (
        <>
          <nav className="navbar-details-foundation d-flex">
            {options.map((item, key) => (
              <TextWithTopLine
                key={key}
                padding={"1rem 0"}
                fontSize={isMobile() ? '0.9rem' : "1.25rem"}
                fontWeight={item.isActive ? 600 : 300}
                borderTop={item.isActive ? null : "5px solid transparent"}
                onClick={() => setActive(key)}
                cursor={"pointer"}
              >
                {item.option}
              </TextWithTopLine>
            ))}
            {/* <Link to="/">
                    <TextWithTopLine padding={'1rem 0'} fontSize="1.25rem" fontWeight={600} >About Us</TextWithTopLine>
                </Link> */}
          </nav>

          {options.map((item, key) => {
            if (item.isActive) return item.view;
            return <React.Fragment key={key + 10}></React.Fragment>;
          })}
        </>
      )}

      {/** 
            <Posts foundation={foundation} />
*/}
    </div>
  );
};

export default FoundationDetails;
