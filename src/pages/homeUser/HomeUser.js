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
  
  const { enableWeb3, Moralis } = useMoralis();
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
      await enableWeb3();
      for (let i = 0; i < response.nfts.length; i++) {
        const readOptions = {
          contractAddress: response.nfts[i].marketAddress,
          functionName: "getListing",
          abi: abiMarketPlace,
          params: {
            nftAddress: response.nfts[i].address,
            tokenId: response.nfts[i].tokenId,
          },
        };
        let status = await Moralis.executeFunction(readOptions);
        response.nfts[i].status = false;
        if (status["seller"] && status["seller"] !== '0x0000000000000000000000000000000000000000') {
          response.nfts[i].status = true;
          response.nfts[i].price = Moralis.Units.FromWei(status["price"]);
        }
      }
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
      <BGHomeUser />
      {nftListShow.length > 0 && 
      <NewestNFT nfts={nftListShow} setPage={setPage} page={page} />
      
      }

    </div>
  )
}

export default HomeUser