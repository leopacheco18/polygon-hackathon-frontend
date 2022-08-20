import React, { useEffect, useState } from 'react'
import useHttp from '../../hooks/useHttp';
import "./Profile.css";
import { useMoralis } from "react-moralis";
import abiMarketPlace from "../../assets/json/abiMarketPlace.json";
import Loading from '../../components/global/Loading';
import BGHomeUser from '../../components/homeUser/BGHomeUser';
import MyNFTs from '../../components/profile/MyNFTs';

const itemPerPages = 4;

const Profile = () => {
  
  const {user, enableWeb3, Moralis} =useMoralis();
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
      endpoint: `nft/get-nft-from-wallet/${user.get('ethAddress')}`,
    };
    const response = await request(configRequest);
    if (response.success) {
      await enableWeb3();
      for(let i = 0; i < response.nfts.length; i++){
        const readOptions = {
          contractAddress: response.nfts[i].marketAddress,
          functionName: "getListing",
          abi: abiMarketPlace,
          params: {
              nftAddress: response.nfts[i].address ,
              tokenId: response.nfts[i].tokenId
          }
        };
        let status = await Moralis.executeFunction(readOptions);
        response.nfts[i].status = false;
        if(status['seller']){
          response.nfts[i].status = true;
          
          response.nfts[i].price = Moralis.Units.FromWei(status['price']);
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
      <MyNFTs nfts={nftListShow} setPage={setPage} page={page} setLoading={setLoading} />
      
      }

    </div>
  )
}

export default Profile