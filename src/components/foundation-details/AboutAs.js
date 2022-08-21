import React from "react";
import { AiFillFileText, AiOutlineEnvironment, AiOutlineMail } from "react-icons/ai";
import countryList from "../../assets/json/countries.json"

const AboutAs = ({ foundation }) => {

    return (
        <div className="d-flex about-us-card w-100">
            <div className="w-100 about-us">
                <div className="w-100 d-flex flex-row about-us-description">
                    <div className="w-30 about-us-description-title d-flex flex-row justify-center align-center">
                        <AiFillFileText className="about-us-description-logo" />
                        <div className="about-us-description-title-des" >
                            Description
                        </div>
                    </div>
                    <div className="w-70 about-use-description-information">
                        {foundation?.description}
                    </div>
                </div>
                <div className="w-100 d-flex flex-row about-us-location-email">
                    <div className="w-50 about-us-email d-flex flex-row">
                        <div className="w-30 about-us-description-title d-flex flex-row justify-center align-center">
                            <AiOutlineEnvironment className="about-us-description-logo" />
                            <div className="about-us-description-title-des" >
                                Location
                            </div>
                        </div>
                        <div className="w-70 about-use-description-information">
                            {countryList[foundation?.country]}
                        </div>
                    </div>
                    <div className="w-50 d-flex flex-row about-us-email">
                        <div className="w-30 about-us-description-title d-flex flex-row justify-center align-center">
                            <AiOutlineMail className="about-us-description-logo" />
                            <div className="about-us-description-title-des" >
                                Email
                            </div>
                        </div>
                        <div className="w-70 about-use-description-information">
                            {foundation?.email}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutAs;