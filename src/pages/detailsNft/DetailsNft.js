import React, { useEffect, useState } from "react";

import Cause from "../../components/detailsNft/Cause";
import Description from "../../components/detailsNft/Description";
import ItemsActivity from "../../components/detailsNft/ItemsActivity";
import Price from "../../components/detailsNft/Price";
import ProfileNft from "../../components/detailsNft/ProfileNft";

import { useParams } from 'react-router-dom';

import './DetailsNft.css'

import SpaceMan from "../../assets/homeUser/spaceman.png"
import CreativeCar from "../../assets/homeUser/creative_car.png"
import InclusionProblem from "../../assets/homeUser/inclusion_problem.png"
import Amount from "../../assets/homeUser/logo-amount.png"
import LogoFoundationSpaceMan from "../../assets/homeUser/logo-foundation-1.png"
import LogoFoundationCreativeCar from "../../assets/homeUser/logo-foundation-2.png"
import LogoFoundationInclusionProblem from "../../assets/homeUser/logo-foundation-3.png"

const nfts = [
    { address: 'Ox00', tokenId: 1, img: SpaceMan, title: "Spaceman", price: 30, logo_price: Amount, logo_foundation: LogoFoundationSpaceMan, name_foundation: 'Astrology Foundation', status: true },
    { address: 'Ox00', tokenId: 2, img: CreativeCar, title: "Creative Car", price: 55, logo_price: Amount, logo_foundation: LogoFoundationCreativeCar, name_foundation: 'Cars Population Charity', status: false },
    { address: 'Ox00', tokenId: 3, img: InclusionProblem, title: "Inclusion Problem", price: 185, logo_price: Amount, logo_foundation: LogoFoundationInclusionProblem, name_foundation: 'Social Inclusion Causes', status: true },
    { address: 'Ox00', tokenId: 4, img: InclusionProblem, title: "Inclusion Problem", price: 185, logo_price: Amount, logo_foundation: LogoFoundationInclusionProblem, name_foundation: 'Social Inclusion Causes', status: true },
];

const pro = {
    owned: "0x...0096",
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan.',
    cause: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem',
    location: 'Ecuador - Quito',
    itemsActivity: [
        { event: 'Sale', price: '30', from: '0x...0096', to: '0x...092', date: '20 hours ago' },
        { event: 'List', price: '30', from: '0x...096', to: '', date: '2 days ago' },
        { event: 'Sale', price: '15', from: '0x...093', to: '0x...096', date: '4 days ago' },
        { event: 'List', price: '15', from: '0x...093', to: '', date: '5 days ago' },
        { event: 'Sale', price: '5', from: '0x...098', to: '0x...093', date: '9 days ago' },
        { event: 'List', price: '5', from: '0x...098', to: '', date: '10 days ago' },
    ]
};

const DetailsNft = () => {

    const [profile, setProfile] = useState(pro)

    const { address, tokenId } = useParams()

    useEffect(() => {

        const selectNFT = Object.values(nfts).find(n => n.address === address && n.tokenId === parseInt(tokenId))

        setProfile({ ...pro, ...selectNFT })

    }, [])

    return (
        <div className="container">
            <div className="w-95 card-details-nft d-flex flex-row">

                <div className="w-50 card-details-nft-container-image">
                    <ProfileNft profile={profile} />
                </div>

                <div className="w-50">

                    <div className="d-flex">

                        <div className="w-60 card-description-nft">
                            <Description profile={profile} />
                        </div>

                        <div className="w-40 card-price-nft">
                            <Price profile={profile} />
                        </div>

                    </div>

                    <div className="card-cause-nft">
                        <Cause profile={profile} />
                    </div>

                    <div className="card-activity-nft">
                        <ItemsActivity profile={profile} />
                    </div>

                </div>

            </div>
        </div>
    )

}

export default DetailsNft;