import React, { useEffect, useState } from "react";

/* Importing the css file. */
import './index.css'

const NewestNFT = ({ nfts }) => {

    const [newestNFTs, setNewestNFTs] = useState(nfts)

    useEffect(() => {
        setNewestNFTs(nfts)
    }, [nfts])

    const renderedNewestNFT = Object.values(newestNFTs).map((nft, i) => {
        return (
            <div className="w-25 container-nft">
                <div className="w-100">
                    <img src={nft?.img} alt="img-nfg" className="w-100 image-nft" />
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
                    <button className={`w-100 card-button-nft ${nft.status ? 'button-nft-available' : 'button-nft-unavailable'}`}>
                        {nft.status ? 'Buy Now' : 'Not available'}
                    </button>
                </div>
            </div>
        )
    })

    return (
        <div className="container-nfs">
            <div>
                Newest NFT´s
            </div>
            <div className="card-nfts">
                <div>

                </div>
                <div className="d-flex flex-wrap justify-space-evenly">
                    {renderedNewestNFT}
                </div>
            </div>
        </div>
    )
}

/* Exporting the component to be used in other files. */
export default NewestNFT;
