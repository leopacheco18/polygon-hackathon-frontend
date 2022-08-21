import React, { useEffect, useState } from "react";
import DarkButton from "../../global/DarkButton";
import TextWithTopLine from "../../global/TextWithTopLine";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Amount from "../../../assets/homeUser/logo-amount.png"

/* Importing the css file. */
import './index.css'

const NewestNFT = ({ nfts, setPage, page }) => {

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
            <div key={i} className="nft-own-list container-nft" onClick={() => redirectToDetailsNFT(nft?.address, nft?.tokenId)} onMouseOver={() => setHoverIndex(i)} onMouseOut={() => setHoverIndex(-1)} style={{ borderRadius: (hoverIndex === i ? '10px 10px 0 0' : '10px') }}>
                <div className="w-100">
                    <img src={nft?.img} alt="nft-detail" className="w-100 image-nft" />
                </div>
                <div className="info-card-nft w-100 d-flex flex-column">
                    <div className="d-flex flex-row justify-space-between" >
                        < p className="card-nft-title mb-0">
                            {nft.title.length > 25 ? `${nft.title.slice(0,25)}...` : nft.title}
                        </p>
                       {nft.status &&
                        <div className="card-nft-amount d-flex flex-row">
                        <p>
                            {nft.price}
                        </p>
                        <img src={Amount} className="card-nft-image-logo-amount" alt="logo-price" />
                    </div>
                       }
                    </div>
                    <div className="card-nft-foundation d-flex flex-row">
                        <img src={nft.logo_foundation} className="card-nft-image-logo-foundation" alt="logo-price" />
                        < p className="card-nft-name-foundation mb-0">
                            {nft.name_foundation.length > 15 ? `${nft.name_foundation.slice(0,15)}...` : nft.name_foundation}
                        </p>
                    </div>
                </div>
                <div className="card-nft-status">
                    <button className={`w-100 card-button-nft ${nft.status ? 'button-nft-available' : 'button-nft-unavailable'} ${hoverIndex === i && 'card-button-nft-show'}`} >
                        {nft.status ? 'Buy Now' : 'Not For Sell'}
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
                    <DarkButton fontSize={'1rem'} padding="3px 6px" borderRadius={"5px"} onClick={() => setPage(page - 1)}> <LeftOutlined /> </DarkButton>
                    <DarkButton fontSize={'1rem'} padding="3px 6px" borderRadius={"5px"} onClick={() => setPage(page + 1)}> <RightOutlined /> </DarkButton>
                </div>
                <div className="w-95 container-ntfs-list d-flex  align-stretch">
                    {renderedNewestNFT}
                </div>
            </div>
        </div>
    )
}

/* Exporting the component to be used in other files. */
export default NewestNFT;
