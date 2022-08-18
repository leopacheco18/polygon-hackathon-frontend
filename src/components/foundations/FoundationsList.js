import React, { useEffect, useState } from "react";
import DarkButton from "../global/DarkButton";
import TextWithTopLine from "../global/TextWithTopLine";
import { LeftOutlined, RightOutlined , SearchOutlined} from "@ant-design/icons";

import { AiOutlineEnvironment } from "react-icons/ai";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import countryList from "../../assets/json/countries.json"
const itemPerPages = 6;
const FoundationsList = ({ foundationsElements }) => {
  const [foundations, setFoundations] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    changePage();
  }, [foundationsElements, page]);

  useEffect(() => {
    filterFoundations();
  }, [search])

  const redirectToDetailsFoundation = (address) => {
    navigate(`/foundation-details/${address}`)
}


const filterFoundations = (returnArr = false) => {
    if(!search){
        changePage();
        return
    };
    let arr = [...foundationsElements];
    arr = arr.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    setPage(1);
    if(returnArr){
        return arr;
    }else{
        setFoundations(arr);
    }
  }

  const changePage = () => {
    let arr= []
    if(search){
        arr = filterFoundations(true);
    }else{
        arr = [...foundationsElements];
    }
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
  }


  const renderedFoundationsList = Object.values(foundations).map(
    (foundation, i) => {
      return (
        <div
          key={i}
          className="w-30 container-nft"
          onClick={() => redirectToDetailsFoundation(foundation.ethAddress)}
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
                  {countryList[foundation?.country]}
                </p>
              </div>
            </div>
            <div className="d-flex justify-center">
              <button className="card-foundation-button">
                More Information
              </button>
            </div>
          </div>
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
        <div className="w-95 flex-wrap container-ntfs-list d-flex   align-start">
          {renderedFoundationsList}
        </div>
      </div>
    </div>
  );
};

/* Exporting the component to be used in other files. */
export default FoundationsList;
