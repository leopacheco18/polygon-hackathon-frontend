import React from "react";

import { AiFillFileText } from "react-icons/ai";

const Cause = ({ profile }) => {

    return (
        <div className="w-100 container-nft-cause" >
            <div className="container-nft-cause-title d-flex flex-row">
                <AiFillFileText className="container-nft-cause-title-icon" />
                <div className="d-flex align-center nft-cause-title">
                    Cause
                </div>
            </div>
            <div className="d-flex flex-row align-center container-nft-cause-foundation">
                <img className="nft-cause-foundation-logo" src={profile.logo_foundation} alt="logo-foundation" />
                <div className="nft-cause-foundation-name">
                    {profile.name_foundation}
                </div>
            </div>
            <div className="container-nft-cause-into">
                {profile.cause}
            </div>
        </div>
    )

}

export default Cause;