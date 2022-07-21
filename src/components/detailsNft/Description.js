import React from "react";

import { AiFillFileText } from "react-icons/ai";

const Description = ({ img, title, owned }) => {

    return (
        <div className="w-100 container-nft-description">
            <div className="container-nft-description-title d-flex flex-row">
                <AiFillFileText className="container-nft-description-title-icon" />
                <div className="d-flex align-center nft-description-title">
                    Description
                </div>
            </div>
            <div className="container-nft-description-into">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan.
            </div>
        </div>
    )

}

export default Description;