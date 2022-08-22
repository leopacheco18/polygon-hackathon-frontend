import React, { useEffect, useState } from "react";
import DarkButton from "../global/DarkButton";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { AiFillCalendar } from "react-icons/ai";
import useHttp from "../../hooks/useHttp";
import ModalPost from "./ModalPost";

const Posts = ({ foundation }) => {
  const [postList, setPostList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { request } = useHttp();
  useEffect(() => {
    if (foundation) {
      getPost();
    }
  }, [foundation]);

  const getPost = async () => {
    let configRequest = {
      type: "get",
      endpoint: `post/get-posts-by-foundation-wallet/${foundation.ethAddress}`,
    };
    const response = await request(configRequest);
    if (response.success) {
      setPostList(response.results);
    }
  };

  const getDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const renderedPostsList =
    postList.length > 0 &&
    Object.values(postList).map((post, i) => {
      return (
        <React.Fragment key={i}>
          <ModalPost
            handleCancel={() => setIsModalVisible(false)}
            post={isModalVisible}
            foundation={foundation}
            isModalVisible={isModalVisible}
          />

          <div
            className="w-30 container-nft"
            style={{ borderRadius: "10px" }}
            onClick={() => setIsModalVisible(post)}
          >
            <div className="w-100">
              <img
                src={post?.image}
                alt="img-nft"
                className="w-100 image-nft"
              />
            </div>
            <div className="info-card-foundation w-100 d-flex flex-column">
              <div className="info-card-foundation-details d-flex flex-column">
                <p className="card-nft-title mb-0">{post.title}</p>
                <div className="card-nft-amount d-flex flex-row">
                  <p>
                    {post.description?.length > 65
                      ? post.description?.slice(0, 65) + "..."
                      : post.description}
                  </p>
                </div>
              </div>
              <div className="d-flex justify-end align-center posts-date">
                <AiFillCalendar className="posts-date-icon" />
                <div className="posts-date-day">{getDate(post.createdAt)}</div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    });

  return (
    <div className="d-flex posts-card w-100">
      <div className="w-100 post">
        <div className="d-flex card-nfts-pagination w-100 ">
          <DarkButton fontSize={"1rem"} padding="3px 6px" borderRadius={"5px"}>
            <LeftOutlined />
          </DarkButton>
          <DarkButton fontSize={"1rem"} padding="3px 6px" borderRadius={"5px"}>
            <RightOutlined />
          </DarkButton>
        </div>
        <div className="w-100 flex-wrap container-ntfs-list d-flex align-start">
          {renderedPostsList}
        </div>
      </div>
    </div>
  );
};

export default Posts;
