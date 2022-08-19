import React, { useState } from "react";

import GreenButton from "../global/GreenButton";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import abiMarketPlace from "../../assets/json/abiMarketPlace.json";
import { toast } from "react-toastify";
import { Input, message, Modal } from "antd";
import { DollarCircleOutlined, CloseOutlined } from "@ant-design/icons";

const ModalPrice = ({ nft, setLoading }) => {
  const { enableWeb3, Moralis } = useMoralis();
  const { fetch } = useWeb3ExecuteFunction();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [price, setPrice] = useState(0);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const sellItem = async () => {
    if(price <= 0){
        message.error('Price value is not valid.')
        return
    }
    setLoading(true);
    await enableWeb3();
    let options = {
      abi: abiMarketPlace,
      contractAddress: nft.marketAddress,
      functionName: "listItem",
      params: {
        nftAddress: nft.nftContract,
        tokenId: nft.uid,
        price: Moralis.Units.ETH(price),
      },
    };

    fetch({
      params: options,
      onSuccess: (r) => {
        console.log(r);
        if (r) {
          setLoading(false);
          toast.success("Your NFT is now on sell.");
        }
      },
      onError: (error) => {
        console.log(error);
        setLoading(false);
        message.error(error.message);
      },
    });
  };
  return (
    <>
      <GreenButton className="sell-button" onClick={showModal}>
        Sell
      </GreenButton>

      <Modal
        title=""
        visible={isModalVisible}
        onCancel={handleCancel}
        closable={false}
        footer={null}
        className="modal-price-container"
      >
      <div className="modal-foundation-close" onClick={handleCancel}>
        <CloseOutlined />
      </div>
        <div className="modal-foundation-form modal-price-form">
          <Input
            name="price"
            type="number"
            step={0.01}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price in Matic..."
            prefix={<DollarCircleOutlined />}
          />
            <button onClick={sellItem}> Sell</button>

        </div>
      </Modal>
    </>
  );
};

export default ModalPrice;
