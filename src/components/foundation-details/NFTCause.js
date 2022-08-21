import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { useNavigate } from "react-router-dom";
import DarkButton from "../global/DarkButton";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Amount from "../../assets/homeUser/logo-amount.png";
import Loading from "../global/Loading";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useMoralis } from "react-moralis";
import abiMarketPlace from "../../assets/json/abiMarketPlace.json";
const itemPerPages = 4;

const NFTCause = ({ setShowNFT, showNFT }) => {
  const [nftList, setNftList] = useState([]);
  const [nftListShow, setNftListShow] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { request } = useHttp();
  const navigate = useNavigate();
  const { enableWeb3, Moralis } = useMoralis();

  useEffect(() => {
    getNftList();
  }, []);

  useEffect(() => {
    changePage();
  }, [nftList, page]);

  const redirectToDetailsNFT = (address, tokenId) => {
    navigate(`/details-nft/${address}/${tokenId}`);
  };

  const getNftList = async () => {
    setLoading(true);
    let configRequest = {
      type: "get",
      endpoint: `nft/get-nfts-from-cause/${showNFT.contractAddress}`,
    };
    const response = await request(configRequest);
    if (response.success) {
      setNftList(response.nfts);
    }
    setLoading(false);
  };

  const changePage = () => {
    let arr = [...nftList];
    if (arr.length === 0) return;
    if (page <= 0) {
      setPage(1);
      return;
    } else if ((page - 1) * itemPerPages >= arr.length) {
      setPage(page - 1);
      return;
    }
    arr = arr.slice((page - 1) * itemPerPages, page * itemPerPages);
    setNftListShow(arr);
  };

  const renderedNFTList =
    nftListShow.length > 0 &&
    Object.values(nftListShow).map((nft, i) => {
      return (
        <div
          key={i}
          className="nft-own-list container-nft"
          onClick={() => redirectToDetailsNFT(nft?.address, nft?.uid)}
          onMouseOver={() => setHoverIndex(i)}
          onMouseOut={() => setHoverIndex(-1)}
          style={{ borderRadius: hoverIndex === i ? "10px 10px 0 0" : "10px" }}
        >
          <div className="w-100">
            <img
              src={nft?.img}
              alt="nft-detail"
              className="w-100 image-nft"
            />
          </div>
          <div className="info-card-nft w-100 d-flex flex-column">
            <div className="d-flex flex-row justify-space-between align-center">
              <p className="card-nft-title mb-0">{nft?.title}</p>
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
          </div>
          <div className="card-nft-status">
                <button className={`w-100 card-button-nft ${nft.status ? 'button-nft-available' : 'button-nft-unavailable'} ${hoverIndex === i && 'card-button-nft-show'}`} >
                    {nft.status ? 'Buy Now' : 'Not for sell'}
                </button>
            </div>
        </div>
      );
    });

  return (
    <div className="d-flex card-nfts w-100">
      {loading && <Loading />}
      <div className="w-95 post">
        <div className="d-flex card-nfts-pagination w-100 ">
          <DarkButton
            fontSize={"1rem"}
            padding="3px 6px"
            borderRadius={"5px"}
            onClick={() => setShowNFT(false)}
          >
            <RiArrowGoBackFill />
          </DarkButton>
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
        <div className="w-100 flex-wrap container-ntfs-list d-flex align-stretch">
          {renderedNFTList}
        </div>
      </div>
    </div>
  );
};

export default NFTCause;
