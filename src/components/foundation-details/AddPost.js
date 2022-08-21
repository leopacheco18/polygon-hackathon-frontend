import { Input, message } from "antd";
import React, { useEffect, useState } from "react";
import TextWithTopLine from "../global/TextWithTopLine";
import { PlusCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import GreenButton from "../global/GreenButton";
import { MdModeEdit } from "react-icons/md";
import DarkButton from "../global/DarkButton";
import CustomDropzone from "../global/CustomDropzone";
import useHttp from "../../hooks/useHttp";
import { toast } from "react-toastify";
import { useMoralis } from "react-moralis";
import Loading from "../global/Loading";

const AddPost = ({ setShowAddPost }) => {
  
  const [fileInfo, setFileInfo] = useState([]);
  const [newPostForm, setNewPostForm] = useState({
    title: '',
    description: ''
  })
  const { request, isLoading  } = useHttp();
  const { user } = useMoralis();
  useEffect(() => {
    if (fileInfo.length > 0) {
      getBase64(fileInfo[0].file);
    } else {
      setNewPostForm({ ...newPostForm, image: "" });
    }
  }, [fileInfo]);

  const getBase64 = (file)  => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setNewPostForm({...newPostForm, image: reader.result})
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

  const handleChange = (e) => {
    setNewPostForm({...newPostForm, [e.target.name] : e.target.value})
  }

  const handleSubmit = async () => {
    if(fileInfo.length > 0 && newPostForm.title && newPostForm.description){
      let configRequest = {
        type: "post",
        endpoint: "post/create-post",
        data: { ...newPostForm, ethAddress: user.get("ethAddress")},
      };
      const response = await request(configRequest);
      if (response.success) {
        toast.success(
          "Your new post have been created successfuly"
        );
        setShowAddPost(false)
      }
    }else{
      message.error('Image, Title and Description are required fields.')
    }
  }

  return (
    <div>
      {isLoading && <Loading />}
      <TextWithTopLine padding={"1rem 0"} fontSize="1.25rem" fontWeight={600}>
        Create New Post
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
            <Input name='title' onChange={handleChange} className="add-post-title" placeholder="Post title *" />
            <Input.TextArea name='description' onChange={handleChange} className="add-post-title add-post-description" rows={10} placeholder="Post description *" />
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
              onClick={() => setShowAddPost(false)}
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
  );
};

export default AddPost;
