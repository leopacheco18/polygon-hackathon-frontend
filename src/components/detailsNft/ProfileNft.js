import React from "react";

const ProfileNft = ({ profile }) => {

    return (
        <div className="h-100 container-nft-profile-details d-flex flex-column">
            <div className="w-100 d-flex flex-row justify-space-between align-center container-nft-profile-principal-info">
                <div className="container-nft-profile-title">
                    {profile.title}
                </div>
                <div className="owned-container-info">
                    owned by <span className="owned-nft">{profile.owned}</span>
                </div>
            </div>
            <div className="h-100">
                <img className="w-100 image-logo-nft" src={profile.img} alt="logo-nft" />
            </div>
        </div>
    )

}

export default ProfileNft;