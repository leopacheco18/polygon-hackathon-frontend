import React, { useEffect, useState } from "react";
import DarkButton from "../global/DarkButton";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { AiFillCalendar, AiOutlineEnvironment } from "react-icons/ai";

const Posts = ({ foundation }) => {

    const [hoverIndex, setHoverIndex] = useState(-1);

    const renderedPostsList = foundation?.posts.length > 0 && Object.values(foundation?.posts).map((post, i) => {
        return (
            <div className="w-30 container-nft" onMouseOver={() => setHoverIndex(i)} onMouseOut={() => setHoverIndex(-1)} style={{ borderRadius: (hoverIndex === i ? '10px 10px 0 0' : '10px') }}>
                <div className="w-100">
                    <img src={post?.img} alt="img-nfg" className="w-100 image-nft" />
                </div>
                <div className="info-card-foundation w-100 d-flex flex-column">
                    <div className="info-card-foundation-details d-flex flex-column" >
                        < p className="card-nft-title mb-0">
                            {post.title}
                        </p>
                        <div className="card-nft-amount d-flex flex-row">
                            <p>
                                {post.description?.length > 65 ? post.description?.slice(0, 65) + '...' : post.description}
                            </p>
                        </div>
                    </div>
                    <div className="d-flex justify-end align-center posts-date">
                        <AiFillCalendar className="posts-date-icon" />
                        <div className="posts-date-day">
                            {post.date}
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="d-flex posts-card w-100">
            <div className="w-100 post">
                <div className="d-flex card-nfts-pagination w-100 ">
                    <DarkButton fontSize={'1rem'} padding="3px 6px" borderRadius={"5px"}> <LeftOutlined /> </DarkButton>
                    <DarkButton fontSize={'1rem'} padding="3px 6px" borderRadius={"5px"}> <RightOutlined /> </DarkButton>
                </div>
                <div className="w-100 flex-wrap container-ntfs-list d-flex justify-space-between align-start">
                    {renderedPostsList}
                </div>
            </div>
        </div>
    )
}

export default Posts;