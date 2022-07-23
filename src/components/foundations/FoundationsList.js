import React, { useEffect, useState } from "react";
import DarkButton from "../global/DarkButton";
import TextWithTopLine from "../global/TextWithTopLine";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { AiOutlineEnvironment } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const FoundationsList = ({ foundationsElements }) => {

    const navigate = useNavigate();

    const [foundations, setFoundations] = useState(foundationsElements)
    const [hoverIndex, setHoverIndex] = useState(-1);

    useEffect(() => {
        setFoundations(foundationsElements)
    }, [foundationsElements])

    const redirectToDetailsFoundation = (name) => {
        navigate(`/foundation-details/${name}`)
    }

    const renderedFoundationsList = Object.values(foundations).map((foundation, i) => {
        return (
            <div className="w-30 container-nft" onClick={() => redirectToDetailsFoundation(foundation.name)} onMouseOver={() => setHoverIndex(i)} onMouseOut={() => setHoverIndex(-1)} style={{ borderRadius: (hoverIndex === i ? '10px 10px 0 0' : '10px') }}>
                <div className="w-100">
                    <img src={foundation?.img} alt="img-nfg" className="w-100 image-nft" />
                </div>
                <div className="info-card-foundation w-100 d-flex flex-column">
                    <div className="info-card-foundation-details d-flex flex-column" >
                        < p className="card-nft-title mb-0">
                            {foundation.name}
                        </p>
                        <div className="card-nft-amount d-flex flex-row">
                            <p>
                                {foundation.description?.length > 38 ? foundation.description?.slice(0, 38) + '...' : foundation.description}
                            </p>
                        </div>
                        <div className="card-foundation-location d-flex flex-row">
                            <div className="card-foundation-location-logo">
                                <AiOutlineEnvironment />
                            </div>
                            <p className="card-foundation-location-name d-flex align-items">
                                {foundation.location?.length > 38 ? foundation.location?.slice(0, 38) + '...' : foundation.location}
                            </p>
                        </div>
                    </div>
                    <div className="d-flex justify-center">
                        <button className="card-foundation-button">
                            More Information
                        </button>
                    </div>
                    {/* 
                    <div className="card-nft-foundation d-flex flex-row">
                        <img src={foundation.logo_foundation} className="card-nft-image-logo-foundation" alt="logo-price" />
                        < p className="card-nft-name-foundation mb-0">
                            {foundation.name_foundation}
                        </p>
                    </div>
                    */}
                </div>
                {/** 
                <div className="card-nft-status">
                    <button className={`w-100 card-button-nft ${foundation.status ? 'button-nft-available' : 'button-nft-unavailable'} ${hoverIndex === i && 'card-button-nft-show'}`} >
                        {foundation.status ? 'Buy Now' : 'Not available'}
                    </button>
                </div>
                */}
            </div>
        )
    })

    return (
        <div className="container-nfs">
            <TextWithTopLine padding={'1rem 0'} fontSize="1.25rem" fontWeight={600} >Foundations</TextWithTopLine>
            <div className="card-nfts">
                <div className="d-flex card-nfts-pagination w-95 ">
                    <DarkButton fontSize={'1rem'} padding="3px 6px" borderRadius={"5px"}> <LeftOutlined /> </DarkButton>
                    <DarkButton fontSize={'1rem'} padding="3px 6px" borderRadius={"5px"}> <RightOutlined /> </DarkButton>
                </div>
                <div className="w-95 flex-wrap container-ntfs-list d-flex  justify-space-between align-start">
                    {renderedFoundationsList}
                </div>
            </div>
        </div>
    )
}

/* Exporting the component to be used in other files. */
export default FoundationsList;
