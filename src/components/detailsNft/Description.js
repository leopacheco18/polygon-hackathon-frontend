import React from "react";

import { AiFillFileText } from "react-icons/ai";

const Description = ({ profile }) => {

    return (
        <div className="w-100 container-nft-description h-100" >
            <div className="container-nft-description-title d-flex flex-row">
                <AiFillFileText className="container-nft-description-title-icon" />
                <div className="d-flex align-center nft-description-title">
                    Description
                </div>
            </div>
            <div className="container-nft-description-into">
                {profile.description}
            </div>
        </div>
    )

}

export default Description;