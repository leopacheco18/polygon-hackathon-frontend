import React, { useEffect, useState } from 'react'
import TextWithTopLine from '../global/TextWithTopLine'
import { PlusCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import CustomDropzone from '../global/CustomDropzone';
import { Input, message } from "antd";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import useHttp from '../../hooks/useHttp';
import { toast } from "react-toastify";
import GreenButton from '../global/GreenButton';
import { MdModeEdit } from 'react-icons/md';
import DarkButton from '../global/DarkButton';
import PolygonLogo from "../../assets/logo/polygon_logo.png";
import abi from "../../assets/json/abiNFT.json";
import Loading from '../global/Loading';


const AddNft = ({setShowAddNft, showAddNft}) => {
    const [fileInfo, setFileInfo] = useState([]);
    const { user, enableWeb3 } = useMoralis();
    const { fetch } = useWeb3ExecuteFunction();
    const { request } = useHttp();
    const [loading, setLoading] = useState(false);
    
  const [newNftForm, setNewNftForm] = useState({
    name: '',
    description: '',
    price: 0
  })
    useEffect(() => {
        if (fileInfo.length > 0) {
          getBase64(fileInfo[0].file);
        } else {
          setNewNftForm({ ...newNftForm, image: "" });
        }
      }, [fileInfo]);

      const getBase64 = (file)  => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          setNewNftForm({...newNftForm, file: reader.result})
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
     }

     
  const handleChange = (e) => {
    setNewNftForm({...newNftForm, [e.target.name] : e.target.value})
  }

  const handleSubmit = async () => {
    if(fileInfo.length > 0 && newNftForm.name && newNftForm.description && newNftForm.price > 0){
      setLoading(true);
      let configRequest = {
        type: "post",
        endpoint: "nft/create-one-nft",
        data: { ...newNftForm },
      };
      const response = await request(configRequest);
      if (response.success) {
        await enableWeb3();
        let dataToSave = {};
          dataToSave.owner = user.get("ethAddress");
          dataToSave._tokenURI = response.nft;
          console.log(dataToSave)
          let options = {
            abi: abi,
            contractAddress: showAddNft,
            functionName: "createCollectible",
            params: dataToSave,
          };
          fetch({
            params: options,
            onSuccess: (r) => {
              console.log(r)
              if (r) {
                setLoading(false);
                toast.success("Your NFT have been minted successfully.");
                setShowAddNft(false);
              }
            },
            onError: (error) => {
              setLoading(false);
              message.error(error.message);
            },
          });
      }else{ 
        setLoading(false);
      }
    }else{
      message.error('Image, Title, Description and Price are required fields.')
    }
  }
  return (
    <div>
      {loading && <Loading />}
    <TextWithTopLine padding={"1rem 0"} fontSize="1.25rem" fontWeight={600}>
      Support by uploading your NFT
    </TextWithTopLine>
    <div className="d-flex about-us-card w-100">
      <div className="w-30">
      {fileInfo.length > 0 ? (
                <>
                  <div className="add-post-new-preview">
                    <div className="position-relative">
                    <img
                      src={fileInfo[0].file.preview}
                      alt="profile-preview"
                    />
                    <CloseCircleFilled
                      className="modal-foundation-form-image-remove"
                      onClick={() => setFileInfo([])}
                    />
                    </div>
                  </div>
                </>
              ) : (
                <CustomDropzone extraClass={'add-new-post-card'} labelToShow={<PlusCircleFilled />} setFileInfo={setFileInfo} />
              )}

        {/* <div className="add-new-post-card d-flex justify-center align-center">
          <PlusCircleFilled />
        </div> */}
      </div>
      <div className="w-5"></div>
      <div className="w-60">
        <div className="add-post-form">
          <Input name='name' onChange={handleChange} className="add-post-title" placeholder="NFT title *" />
          <Input.TextArea name='description' onChange={handleChange} className="add-post-title add-post-description" rows={8} placeholder="NFT description *" />
          <Input
                name="price"
                type="number"
                step={0.01}
                onChange={handleChange}
                className="add-post-title-with-addon"
                placeholder="Price *"
                addonAfter={
                  <img
                    className="polygon-logo-new-cause"
                    src={PolygonLogo}
                    alt="Polygon logo"
                  />
                }
              />
          
          <br /> <br />
        <div className="d-flex justify-end add-new-post-buttons">
        <GreenButton onClick={handleSubmit}>
            <div className="add-new-post-cancel">
              <div className="d-flex align-center">
                <MdModeEdit />
              </div>
              Publish
            </div>
          </GreenButton>
          <DarkButton
            onClick={() => setShowAddNft(false)}
            fontWeight={300}
            fontSize={"1rem"}
            padding="5px 10px 5px 5px"
            borderRadius={"10px"}
          >
            <div className="add-new-post-cancel">
              <div className="d-flex align-center">
            <CloseCircleFilled />
              </div>
              Cancel
            </div> 
          </DarkButton>
        </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AddNft