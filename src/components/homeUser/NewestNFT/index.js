import React, { useEffect, useState } from "react";
import DarkButton from "../../global/DarkButton";
import TextWithTopLine from "../../global/TextWithTopLine";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

/* Importing the css file. */
import './index.css'

const NewestNFT = ({ nfts }) => {

    const navigate = useNavigate();

    const [newestNFTs, setNewestNFTs] = useState(nfts)
    const [hoverIndex, setHoverIndex] = useState(-1);

    useEffect(() => {
        setNewestNFTs(nfts)
    }, [nfts])

    const redirectToDetailsNFT = (address, tokenId) => {
        navigate(`/details-nft/${address}/${tokenId}`)
    }

    const renderedNewestNFT = Object.values(newestNFTs).map((nft, i) => {
        return (
            <div key={i} className="w-100 container-nft" onClick={() => redirectToDetailsNFT(nft?.address, nft?.tokenId)} onMouseOver={() => setHoverIndex(i)} onMouseOut={() => setHoverIndex(-1)} style={{ borderRadius: (hoverIndex === i ? '10px 10px 0 0' : '10px') }}>
                <div className="w-100">
                    <img src={nft?.img} alt="nft-detail" className="w-100 image-nft" />
                </div>
                <div className="info-card-nft w-100 d-flex flex-column">
                    <div className="d-flex flex-row justify-space-between" >
                        < p className="card-nft-title mb-0">
                            {nft.title}
                        </p>
                        <div className="card-nft-amount d-flex flex-row">
                            <p>
                                {nft.price}
                            </p>
                            <img src={nft.logo_price} className="card-nft-image-logo-amount" alt="logo-price" />
                        </div>
                    </div>
                    <div className="card-nft-foundation d-flex flex-row">
                        <img src={nft.logo_foundation} className="card-nft-image-logo-foundation" alt="logo-price" />
                        < p className="card-nft-name-foundation mb-0">
                            {nft.name_foundation}
                        </p>
                    </div>
                </div>
                <div className="card-nft-status">
                    <button className={`w-100 card-button-nft ${nft.status ? 'button-nft-available' : 'button-nft-unavailable'} ${hoverIndex === i && 'card-button-nft-show'}`} >
                        {nft.status ? 'Buy Now' : 'Not available'}
                    </button>
                </div>
            </div>
        )
    })

    return (
        <div className="container-nfs">
            <TextWithTopLine padding={'1rem 0'} fontSize="1.25rem" fontWeight={600} >Newest NFT´s</TextWithTopLine>
            <div className="card-nfts">
                <div className="d-flex card-nfts-pagination w-95 ">
                    <DarkButton fontSize={'1rem'} padding="3px 6px" borderRadius={"5px"}> <LeftOutlined /> </DarkButton>
                    <DarkButton fontSize={'1rem'} padding="3px 6px" borderRadius={"5px"}> <RightOutlined /> </DarkButton>
                </div>
                <div className="w-95 container-ntfs-list d-flex  justify-space-between align-start">
                    {renderedNewestNFT}
                </div>
            </div>
        </div>
    )
}

/* Exporting the component to be used in other files. */
export default NewestNFT;
