import React, { useState } from "react";

import { AiFillPoundCircle } from "react-icons/ai";
import {
  useMoralis,
  useWeb3ExecuteFunction,
  useMoralisWeb3Api,
} from "react-moralis";
import Amount from "../../assets/homeUser/logo-amount.png";
import abiMarketPlace from "../../assets/json/abiMarketPlace.json";
import Loading from "../global/Loading";

import { toast } from "react-toastify";
import { message } from "antd";
import useHttp from "../../hooks/useHttp";

const Price = ({ profile }) => {
  const Web3Api = useMoralisWeb3Api();
  const { user, enableWeb3, Moralis } = useMoralis();
  const { fetch } = useWeb3ExecuteFunction();
  const [loading, setLoading] = useState(false);
  const { request } = useHttp();

  const handleBuy = async () => {
    setLoading(true);
    await enableWeb3();
    const optionsBalance = {
      chain: "mumbai",
    };
    const nativeBalance = await Web3Api.account.getNativeBalance(
      optionsBalance
    );
    if (
      Moralis.Units.FromWei(nativeBalance.balance) <= parseFloat(profile.price)
    ) {
      message.error("Not enough matic.");
      setLoading(false);
      return;
    }
    let options = {
      abi: abiMarketPlace,
      contractAddress: profile.marketAddress,
      functionName: "buyItem",
      params: {
        nftAddress: profile.nftContract,
        tokenId: profile.uid,
      },
      msgValue: Moralis.Units.ETH(profile.price),
    };

    fetch({
      params: options,
      onSuccess: async (r) => {
        if (r) {
          let configRequest = {
            type: "post",
            endpoint: `nft/tradeNft`,
            data: {
              ethAddress: user.get("ethAddress"),
              tokenId: profile.tokenId,
              address: profile.address,
            },
          };
          const response = await request(configRequest);
          if (response.success) {
            toast.success("The NFT is now yours. Congratulations!");
          }
          setLoading(false);
        }
      },
      onError: (error) => {
        console.log(error);
        setLoading(false);
        message.error(error.message);
      },
    });
  };

  return (
    <div className="w-100 container-nft-price h-100">
      {loading && <Loading />}
      <div className="container-nft-price-title d-flex flex-row">
        <AiFillPoundCircle className="container-nft-price-title-icon" />
        <div className="d-flex align-center nft-price-title">Price</div>
      </div>
      <div className="d-flex flex-row justify-space-between container-nft-price-actual-price">
        <div className="container-nft-price-actual-price-title">
          Actual Price
        </div>
        <div className="container-nft-price-actual-price-image">
          <img
            className="nft-price-actual-price-image"
            src={Amount}
            alt="logo-price"
          />
          {profile.price ? profile.price : "None"}
        </div>
      </div>
      <div className="d-flex justify-center container-nft-price-button">
        <button
          className={`nft-price-button ${
            profile.status && "nft-price-button-available"
          }`}
          onClick={handleBuy}
          disabled={!profile.status}
        >
          {profile.status ? "Buy Now" : "Not for sell"}
        </button>
      </div>
    </div>
  );
};

export default Price;
