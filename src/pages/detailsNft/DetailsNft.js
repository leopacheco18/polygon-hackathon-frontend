import React, { useEffect, useState } from "react";

import Cause from "../../components/detailsNft/Cause";
import Description from "../../components/detailsNft/Description";
import ItemsActivity from "../../components/detailsNft/ItemsActivity";
import Price from "../../components/detailsNft/Price";
import ProfileNft from "../../components/detailsNft/ProfileNft";

import './DetailsNft.css'

import SpaceMan from "../../assets/homeUser/spaceman.png"
import Amount from "../../assets/homeUser/logo-amount.png"
import LogoFoundationSpaceMan from "../../assets/homeUser/logo-foundation-1.png"


const pro = {
    img: SpaceMan,
    title: "Spaceman",
    owned: "0x...0096",
    price: 30,
    logo_price: Amount,
    logo_foundation: LogoFoundationSpaceMan,
    name_foundation: 'Astrology Foundation',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
    location: 'Ecuador - Quito',
    itemsActivity: [
        { event: 'Sale', price: '30', from: '0x...0096', to: '0x...092', date: '20 hours ago' },
        { event: 'List', price: '30', from: '0x...096', to: '', date: '2 days ago' },
        { event: 'Sale', price: '15', from: '0x...093', to: '0x...096', date: '4 days ago' },
        { event: 'List', price: '15', from: '0x...093', to: '', date: '5 days ago' },
        { event: 'Sale', price: '5', from: '0x...098', to: '0x...093', date: '9 days ago' },
        { event: 'List', price: '5', from: '0x...098', to: '', date: '10 days ago' },
    ],
    status: true
};

const DetailsNft = () => {

    const [profile, setProfile] = useState(pro)

    useEffect(() => {

        // this we need to create and call a function to get the profile of the nft

        console.log(pro)
        setProfile(pro)

    }, [])

    return (
        <div className="container">
            <div className="w-95 card-details-nft d-flex flex-row">

                <div className="w-50 card-details-nft-container-image">
                    <ProfileNft profile={profile} />
                </div>

                <div className="w-50 d-flex flex-wrap">

                    <div className="w-60 card-description-nft">
                        <Description profile={profile} />
                    </div>

                    <div className="w-40 card-price-nft">
                        <Price profile={profile} />
                    </div>

                    <Cause />

                    <ItemsActivity />

                </div>

            </div>
        </div>
    )

}

export default DetailsNft;