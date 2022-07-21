import React from "react";
import { AiOutlineSwap } from "react-icons/ai";

const ItemsActivity = ({ profile }) => {

    const renderedItemsActivity = Object.values(profile?.itemsActivity).map((item, index) => {
        return (
            <tr key={index} className="item-activity">
                <td>{item.event}</td>
                <td>
                    <img className="item-activity-logo-price" src={profile.logo_price} alt="logo-price" />
                    {item.price}
                </td>
                <td>{item.from}</td>
                <td>{item.to}</td>
                <td>{item.date}</td>
            </tr>
        )
    })

    return (
        <div className="w-100 container-nft-activity h-100" >
            <div className="container-nft-activity-title d-flex flex-row">
                <AiOutlineSwap className="container-nft-activity-title-icon" />
                <div className="d-flex align-center nft-activity-title">
                    Item Activity
                </div>
            </div>
            <div className="container-nft-activity-into">
                <table className="items-activity w-100">
                    <tr className="item-activity">
                        <th>Event</th>
                        <th>Price</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Date</th>
                    </tr>
                    {renderedItemsActivity}
                </table>
            </div>
        </div>
    )

}

export default ItemsActivity;