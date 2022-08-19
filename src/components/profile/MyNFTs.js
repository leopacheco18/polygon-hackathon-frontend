import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DarkButton from "../global/DarkButton";
import TextWithTopLine from "../global/TextWithTopLine";
import Amount from "../../assets/homeUser/logo-amount.png";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import GreenButton from "../global/GreenButton";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import abiMarketPlace from '../../assets/json/abiMarketPlace.json';
import { toast } from "react-toastify";
import {  message } from "antd";

const MyNFTs = ({ nfts, setPage, page, setLoading }) => {
  const navigate = useNavigate();

  const [newestNFTs, setNewestNFTs] = useState(nfts);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const {enableWeb3, Moralis} = useMoralis();
  const { fetch } = useWeb3ExecuteFunction();

  useEffect(() => {
    setNewestNFTs(nfts);
  }, [nfts]);

  const redirectToDetailsNFT = (address, tokenId) => {
    navigate(`/details-nft/${address}/${tokenId}`);
  };

  const checkfunction = async (nft) => {
    setLoading(true);
    await enableWeb3();
    let options = {
      abi: abiMarketPlace,
      contractAddress: '0x3ef91d1ffea077a281a02b92031e2e48a2164471',
      functionName: "getListing",
      params: {
        nftAddress: '0x8ada32f4940e3b903637d60e5aab26124d90b270',
        tokenId: nft.uid
      },
    };
    fetch({
      params: options,
      onSuccess: (r) => {
        console.log(r)
        if (r) {
          setLoading(false);
          toast.success("Your NFT is now on sell.");
        }
      },
      onError: (error) => {
        console.log(error)
        setLoading(false);
        message.error(error.message);
      },
    });
  }

  const sellItem = async (nft) => { 
    setLoading(true);
    await enableWeb3();
    let options = {
      abi: abiMarketPlace,
      contractAddress: nft.marketAddress,
      functionName: "listItem",
      params: {
        nftAddress: nft.nftContract,
        tokenId: nft.uid,
        price:  Moralis.Units.ETH("0.5")
      },
    };
    
    
    fetch({
      params: options,
      onSuccess: (r) => {
        console.log(r)
        if (r) {
          setLoading(false);
          toast.success("Your NFT is now on sell.");
        }
      },
      onError: (error) => {
        console.log(error)
        setLoading(false);
        message.error(error.message);
      },
    });
  }

  const renderedMyNFT = Object.values(newestNFTs).map((nft, i) => {
    return (
      <div
        key={i}
        className="w-100 container-nft position-relative"
        onMouseOver={() => setHoverIndex(i)}
        onMouseOut={() => setHoverIndex(-1)}
        style={{ borderRadius: hoverIndex === i ? "10px 10px 0 0" : "10px" }}
      >
        <GreenButton
          className="sell-button"
          onClick={() => sellItem(nft)}
        >
          Sell
        </GreenButton>

        <div className="w-100" 
        onClick={() => redirectToDetailsNFT(nft?.address, nft?.tokenId)}>
          <img src={nft?.img} alt="nft-detail" className="w-100 image-nft" />
        </div>
        <div className="info-card-nft w-100 d-flex flex-column">
          <div className="d-flex flex-row justify-space-between">
            <p className="card-nft-title mb-0">{nft.title}</p>
            <div className="card-nft-amount d-flex flex-row">
              <p>{nft.price}</p>
              <img
                src={Amount}
                className="card-nft-image-logo-amount"
                alt="logo-price"
              />
            </div>
          </div>
          <div className="card-nft-foundation d-flex flex-row">
            <img
              src={nft.logo_foundation}
              className="card-nft-image-logo-foundation"
              alt="logo-price"
            />
            <p className="card-nft-name-foundation mb-0">
              {nft.name_foundation}
            </p>
          </div>
        </div>
        <div className="card-nft-status">
          <button
            className={`w-100 card-button-nft ${
              nft.status ? "button-nft-available" : "button-nft-unavailable"
            } ${hoverIndex === i && "card-button-nft-show"}`}
          >
            {nft.status ? "Buy Now" : "Not available"}
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="container-nfs">
      <TextWithTopLine padding={"1rem 0"} fontSize="1.25rem" fontWeight={600}>
        My NFT´s
      </TextWithTopLine>
      <div className="card-nfts">
        <div className="d-flex card-nfts-pagination w-95 ">
          <DarkButton
            fontSize={"1rem"}
            padding="3px 6px"
            borderRadius={"5px"}
            onClick={() => setPage(page - 1)}
          >
            {" "}
            <LeftOutlined />{" "}
          </DarkButton>
          <DarkButton
            fontSize={"1rem"}
            padding="3px 6px"
            borderRadius={"5px"}
            onClick={() => setPage(page + 1)}
          >
            {" "}
            <RightOutlined />{" "}
          </DarkButton>
        </div>
        <div className="w-95 container-ntfs-list d-flex  align-start">
          {renderedMyNFT}
        </div>
      </div>
    </div>
  );
};

export default MyNFTs;
