import { Input } from "antd";
import React from "react";
import TextWithTopLine from "../global/TextWithTopLine";
import { PlusCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import GreenButton from "../global/GreenButton";
import { MdModeEdit } from "react-icons/md";
import DarkButton from "../global/DarkButton";

const AddPost = ({ setShowAddPost }) => {
  return (
    <div>
      <TextWithTopLine padding={"1rem 0"} fontSize="1.25rem" fontWeight={600}>
        Create New Post
      </TextWithTopLine>
      <div className="d-flex about-us-card w-100">
        <div className="w-30">
          <div className="add-new-post-card d-flex justify-center align-center">
            <PlusCircleFilled />
          </div>
        </div>
        <div className="w-5"></div>
        <div className="w-60">
          <div>
            <Input placeholder="Post title..." />
            <Input.TextArea placeholder="Post description..." />
          <div className="d-flex justify-end">
          <GreenButton>
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
              <CloseCircleFilled /> Cancel
            </DarkButton>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
