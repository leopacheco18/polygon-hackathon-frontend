import React, { useEffect, useState } from 'react'

import './HomeUser.css'

import NewestNFT from '../../components/homeUser/NewestNFT';
import BGHomeUser from '../../components/homeUser/BGHomeUser';
import useHttp from '../../hooks/useHttp';
import Loading from '../../components/global/Loading';
import { useMoralis } from 'react-moralis';
import abiMarketPlace from "../../assets/json/abiMarketPlace.json";

// const nfts = [
//   { address: 'Ox00', tokenId: 1, img: SpaceMan, title: "Spaceman", price: 30, logo_price: Amount, logo_foundation: LogoFoundationSpaceMan, name_foundation: 'Astrology Foundation', status: true },
//   { address: 'Ox00', tokenId: 2, img: CreativeCar, title: "Creative Car", price: 55, logo_price: Amount, logo_foundation: LogoFoundationCreativeCar, name_foundation: 'Cars Population Charity', status: false },
//   { address: 'Ox00', tokenId: 3, img: InclusionProblem, title: "Inclusion Problem", price: 185, logo_price: Amount, logo_foundation: LogoFoundationInclusionProblem, name_foundation: 'Social Inclusion Causes', status: true },
//   { address: 'Ox00', tokenId: 4, img: InclusionProblem, title: "Inclusion Problem", price: 185, logo_price: Amount, logo_foundation: LogoFoundationInclusionProblem, name_foundation: 'Social Inclusion Causes', status: true },
// ];


const itemPerPages = 4;

const HomeUser = () => {
  
  const isMobile = () => window.matchMedia("(max-width: 800px)").matches;
  const [nftList, setNftList] = useState([]);
  const [nftListShow, setNftListShow] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { request } = useHttp();
  useEffect(() => {

    // call function get newest nfts and save that in a variable
    getNfts();
  }, [])

  useEffect(() => {
    changePage();
  }, [nftList, page]);

  const getNfts = async () => {
    setLoading(true);
    let configRequest = {
      type: "get",
      endpoint: `nft/get-newest-nfts`,
    };
    const response = await request(configRequest);
    if (response.success) {
      setNftList(response.nfts);
    }
    setLoading(false);
  }

  const changePage = () => {
    let arr = [...nftList];
    if (arr.length === 0) return;
    if (page <= 0) {
      setPage(1);
      return;
    } else if ((page - 1) * itemPerPages >= arr.length) {
      setPage(page - 1);
      return;
    }
    arr = arr.slice((page - 1) * itemPerPages, page * itemPerPages);
    setNftListShow(arr);
  };

  return (
    <div className='container'>
      
    {loading && <Loading />}
    {!isMobile() && 
      <BGHomeUser />
    }
      {nftListShow.length > 0 && 
      <NewestNFT nfts={nftListShow} setPage={setPage} page={page} />
      
      }

    </div>
  )
}

export default HomeUser