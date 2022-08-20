import React, { useEffect, useState } from "react";

import Cause from "../../components/detailsNft/Cause";
import Description from "../../components/detailsNft/Description";
import Price from "../../components/detailsNft/Price";
import ProfileNft from "../../components/detailsNft/ProfileNft";

import { useParams, useNavigate } from "react-router-dom";

import "./DetailsNft.css";

import useHttp from "../../hooks/useHttp";
import DarkButton from "../../components/global/DarkButton";
import { RiArrowGoBackFill } from "react-icons/ri";
import Loading from "../../components/global/Loading";
import abiMarketPlace from "../../assets/json/abiMarketPlace.json";
import { useMoralis } from "react-moralis";

const DetailsNft = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState();

  const { address, tokenId } = useParams();
  const { request } = useHttp();
  const [loading, setLoading] = useState(false);
  const { enableWeb3, Moralis } = useMoralis();

  useEffect(() => {
    getNft();
  }, []);

  const getNft = async () => {
    setLoading(true);
    let configRequest = {
      type: "get",
      endpoint: `nft/get-nfts-from-address-and-tokenid/${address}/${tokenId}`,
    };
    const response = await request(configRequest);
    if (response.success) {

      await enableWeb3();
      const readOptions = {
        contractAddress: response.nft.marketAddress,
        functionName: "getListing",
        abi: abiMarketPlace,
        params: {
          nftAddress: response.nft.address,
          tokenId: response.nft.tokenId,
        },
      };
      let status = await Moralis.executeFunction(readOptions);
      response.nft.status = false;
      if (status["seller"] && status["seller"] !== '0x0000000000000000000000000000000000000000') {
        response.nft.status = true;
        response.nft.price = Moralis.Units.FromWei(status["price"]);
      }
      setProfile(response.nft);
    }
    setLoading(false);
  };

  return (
    <div className="container">
        
      {loading && <Loading />}
      {profile && (
        <div className="w-95 card-details-nft ">
            
            
          <DarkButton
              onClick={() => navigate(-1)}
              fontWeight={300}
              fontSize={"0.1rem"}
              padding="5px 10px 5px 5px"
              borderRadius={"10px"}
              margin={'10px'}
            >
              <div className="get-back-nft-details">
                <div className="d-flex align-center">
                  <RiArrowGoBackFill />
                </div>
                Back
              </div>
            </DarkButton>
            <div className="d-flex flex-row">
            <div className="w-50 card-details-nft-container-image">
            <ProfileNft profile={profile} />
          </div>

          <div className="w-50">
            <div className="d-flex">
              <div className="w-60 card-description-nft">
                <Description profile={profile} />
              </div>

              <div className="w-40 card-price-nft">
                <Price profile={profile} />
              </div>
            </div>

            <div className="card-cause-nft">
              <Cause profile={profile} />
            </div>

          </div>
            </div>
         
        </div>
      )}
    </div>
  );
};

export default DetailsNft;
