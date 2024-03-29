import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DarkButton from "../global/DarkButton";
import TextWithTopLine from "../global/TextWithTopLine";
import Amount from "../../assets/homeUser/logo-amount.png";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import ModalPrice from "./ModalPrice";
import GreenButton from "../global/GreenButton";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import abiMarketPlace from "../../assets/json/abiMarketPlace.json";
import { toast } from "react-toastify";
import { message } from "antd";
import abiNFT from "../../assets/json/abiNFT.json";

const MyNFTs = ({ nfts, setPage, page, setLoading }) => {
  const navigate = useNavigate();
  const {enableWeb3} =useMoralis();
  const { fetch } = useWeb3ExecuteFunction();

  const [newestNFTs, setNewestNFTs] = useState(nfts);

  useEffect(() => {
    setNewestNFTs(nfts);
  }, [nfts]);

  const redirectToDetailsNFT = (address, tokenId) => {
    navigate(`/details-nft/${address}/${tokenId}`);
  };


  const stopSelling = async (nft) => {
    setLoading(true);
    await enableWeb3();
    let options = {
      abi: abiMarketPlace,
      contractAddress: nft.marketAddress,
      functionName: "cancelListing",
      params: {
        nftAddress: nft.nftContract,
        tokenId: nft.uid
      },
    };
    fetch({
      params: options,
      onSuccess: (r) => {
        if (r) {
          setLoading(false);
          toast.success("Your NTF is not for sale.");
        }
      },
      onError: (error) => {
        setLoading(false);
        message.error(error.message);
      },
    });
  }

  const approveNft = async (nft) => {
    setLoading(true);
    await enableWeb3();
    let options = {
      abi: abiNFT,
      contractAddress: nft.nftContract,
      functionName: "approve",
      params: {
        to: nft.marketAddress,
        tokenId: nft.uid
      },
    };
    fetch({
      params: options,
      onSuccess: (r) => {
        if (r) {
          setLoading(false);
          toast.success("Your NTF is approved for selling.");
        }
      },
      onError: (error) => {
        setLoading(false);
        message.error(error.message);
      },
    });
  }
  

  const renderedMyNFT = Object.values(newestNFTs).map((nft, i) => {
    return (
      <div
        key={i}
        className="nft-own-list container-nft position-relative"
        style={{ borderRadius: "10px" }}
      >
        {nft.isApproved ?
        <>
        
        {nft.status ?
        <GreenButton className="stop-sell-button" onClick={() => stopSelling(nft)}>
        Stop Selling
      </GreenButton>

        :
        <ModalPrice nft={nft} setLoading={setLoading} />
        
        }
        </>
        
        : 
        <GreenButton className="approve-button" onClick={() => approveNft(nft)}>
        Approve
      </GreenButton>
        }

        <div className="w-100" 
        onClick={() => redirectToDetailsNFT(nft?.address, nft?.tokenId)}>
          <img src={nft?.img} alt="nft-detail" className="w-100 image-nft" />
        </div>
        <div className="info-card-nft w-100 d-flex flex-column">
          <div className="d-flex flex-row justify-space-between">
            <p className="card-nft-title mb-0">{nft.title}</p>
            {nft.status && 
            <div className="card-nft-amount d-flex flex-row">
              <p>{nft.price}</p>
              <img
                src={Amount}
                className="card-nft-image-logo-amount"
                alt="logo-price"
              />
            </div>
            }
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
            
            <LeftOutlined />
          </DarkButton>
          <DarkButton
            fontSize={"1rem"}
            padding="3px 6px"
            borderRadius={"5px"}
            onClick={() => setPage(page + 1)}
          >
            
            <RightOutlined />
          </DarkButton>
        </div>
        <div className="w-95 container-ntfs-list d-flex  align-stretch">
          {newestNFTs.length > 0 ? 
          renderedMyNFT:
          "You don't have NFT's yet."  
        }
        </div>
      </div>
    </div>
  );
};

export default MyNFTs;
