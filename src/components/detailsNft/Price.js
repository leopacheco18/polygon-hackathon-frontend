import React from "react";

import { AiFillPoundCircle } from "react-icons/ai";

const Price = ({ profile }) => {

    return (
        <div className="w-100 container-nft-price h-100">
            <div className="container-nft-price-title d-flex flex-row">
                <AiFillPoundCircle className="container-nft-price-title-icon" />
                <div className="d-flex align-center nft-price-title">
                    Price
                </div>
            </div>
            <div className="d-flex flex-row justify-space-between container-nft-price-actual-price">
                <div className="container-nft-price-actual-price-title">
                    Actual Price
                </div>
                <div className="container-nft-price-actual-price-image">
                    <img className="nft-price-actual-price-image" src={profile.logo_price} alt="logo-price" />
                    {profile.price}
                </div>
            </div>
            <div className="d-flex justify-center container-nft-price-button">
                <button className="nft-price-button">
                    Buy Now
                </button>
            </div>
        </div>
    )

}

export default Price;