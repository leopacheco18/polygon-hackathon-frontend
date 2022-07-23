import React, { useEffect, useState } from "react";
import DarkButton from "../global/DarkButton";
import TextWithTopLine from "../global/TextWithTopLine";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import { AiOutlineEnvironment } from "react-icons/ai";
import { Input } from "antd";
import { SearchOutlined } from '@ant-design/icons';

const itemPerPages = 6;
const FoundationsList = ({ foundationsElements }) => {
  const [foundations, setFoundations] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    changePage();
  }, [foundationsElements, page]);

  useEffect(() => {
    filterFoundations();
  }, [search])


  const filterFoundations = (returnArr = false) => {
    if(!search){
        changePage();
        return
    };
    let arr = [...foundationsElements];
    arr = arr.filter(item => item.name.includes(search))
    setPage(1);
    if(returnArr){
        return arr;
    }else{
        setFoundations(arr);
    }
  }

  const changePage = () => {
    if(search){
        let arr = filterFoundations(true);
        if(arr.length === 0) return;
        if(page <= 0){
            setPage(1)
            return;
        }else if(((page - 1) * itemPerPages) >= arr.length){
            setPage(page -1);
            return;
        } 
        arr = arr.slice((page - 1) * itemPerPages, page * itemPerPages)
        setFoundations(arr);
    }else{
        if(foundationsElements.length === 0) return;
        if(page <= 0){
            setPage(1)
            return;
        }else if(((page - 1) * itemPerPages) >= foundationsElements.length){
            setPage(page -1);
            return;
        } 
        let arr = [...foundationsElements];
        arr = arr.slice((page - 1) * itemPerPages, page * itemPerPages)
        setFoundations(arr);
    }
  }

  const renderedFoundationsList = Object.values(foundations).map(
    (foundation, i) => {
      return (
        <div
          className="w-30 container-nft"
          onMouseOver={() => setHoverIndex(i)}
          onMouseOut={() => setHoverIndex(-1)}
          style={{ borderRadius: hoverIndex === i ? "10px 10px 0 0" : "10px" }}
        >
          <div className="w-100">
            <img
              src={foundation?.image}
              alt="nft-foundation"
              className="w-100 image-nft"
            />
          </div>
          <div className="info-card-foundation w-100 d-flex flex-column">
            <div className="info-card-foundation-details d-flex flex-column">
              <p className="card-nft-title mb-0">{foundation.name}</p>
              <div className="card-nft-amount d-flex flex-row">
                <p>
                  {foundation.description?.length > 38
                    ? foundation.description?.slice(0, 38) + "..."
                    : foundation.description}
                </p>
              </div>
              <div className="card-foundation-location d-flex flex-row">
                <div className="card-foundation-location-logo">
                  <AiOutlineEnvironment />
                </div>
                <p className="card-foundation-location-name d-flex align-items">
                  {foundation.location?.length > 38
                    ? foundation.location?.slice(0, 38) + "..."
                    : foundation.location}
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
      );
    }
  );

  return (
    <div className="container-nfs">
      <div className="d-flex justify-space-between align-end">
        <TextWithTopLine padding={"1rem 0"} fontSize="1.25rem" fontWeight={600}>
          Foundations
        </TextWithTopLine>
        <div className="search-bar">
        <Input
                  name="name"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  prefix={<SearchOutlined />}
                />
        </div>
      </div>
      <div className="card-nfts">
        <div className="d-flex card-nfts-pagination w-95 ">
          <DarkButton fontSize={"1rem"} padding="3px 6px" borderRadius={"5px"} onClick={() => setPage(page - 1)}>
            <LeftOutlined />
          </DarkButton>
          <DarkButton fontSize={"1rem"} padding="3px 6px" borderRadius={"5px"} onClick={() => setPage(page + 1)}>
            <RightOutlined />
          </DarkButton>
        </div>
        <div className="w-95 flex-wrap container-ntfs-list d-flex  justify-space-between align-start">
          {renderedFoundationsList}
        </div>
      </div>
    </div>
  );
};

/* Exporting the component to be used in other files. */
export default FoundationsList;
