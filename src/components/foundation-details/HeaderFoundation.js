import React from "react";
import { FaHandHoldingHeart } from "react-icons/fa";
import { MdMarkEmailUnread, MdModeEdit } from "react-icons/md";
import GreenButton from "../global/GreenButton";

const HeaderFoundation = ({ foundation, isOwner }) => {
  return (
    <div className="d-flex">
      <div className="w-30">
        <figure className="profile-foundation">
          <img src={foundation?.image} className="back-image" alt="profile" />
          <img src={foundation?.image} alt="profile" />
        </figure>
      </div>
      <div className="w-70">
        <div className="profile-foundation-info-container">
          <div className="w-70 profile-foundation-header-name">
            <h2>{foundation?.name}</h2>
            <div className="profile-foundation-options">
              <GreenButton>
                <div>
                  <MdMarkEmailUnread />
                </div>
                Subscribe
              </GreenButton>
              {isOwner && (
                <>
                  <GreenButton>
                    <div>
                      <MdModeEdit />
                    </div>
                    New Post
                  </GreenButton>
                  <GreenButton>
                    <div>
                      <MdModeEdit />
                    </div>
                    New Cause
                  </GreenButton>
                </>
              )}
            </div>
          </div>
          <div className="w-30">
            <FaHandHoldingHeart className="profile-foundation-icon-hand" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderFoundation;
