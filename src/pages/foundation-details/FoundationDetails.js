import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
  BrowserRouter,
  Switch,
  useParams,
} from "react-router-dom";

import AboutAs from "../../components/foundation-details/AboutAs";
import Posts from "../../components/foundation-details/Posts";
import TextWithTopLine from "../../components/global/TextWithTopLine";

import "./FoundationDetails.css";

import Logo1 from "../../assets/foundation/1.png";
import Logo2 from "../../assets/foundation/2.png";
import Logo3 from "../../assets/foundation/3.png";
import useHttp from "../../hooks/useHttp";
import HeaderFoundation from "../../components/foundation-details/HeaderFoundation";
import { useMoralis } from "react-moralis";

const fou = {
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
  cause:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem",
  location: "Ecuador - Quito",
  email: "waynermoya@hotmai.com",
  posts: [
    {
      img: Logo1,
      title: "Purchase of Dog Food",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
      date: "July 20, 2022",
    },
    {
      img: Logo2,
      title: "Purchase of Dog Food",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
      date: "July 20, 2022",
    },
    {
      img: Logo3,
      title: "Purchase of Dog Food",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
      date: "July 20, 2022",
    },
  ],
};

const FoundationDetails = () => {
  let { address } = useParams();
  const [foundation, setFoundation] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const {user} = useMoralis();
  const { request } = useHttp();
  const [options, setOptions] = useState([
    { option: "About us", isActive: true },
    { option: "Post", isActive: false },
    { option: "Support the cause", isActive: false },
  ]);

  useEffect(() => {
    // call to get all profile of foundation
    if (!foundation) {
      getFoundationByAddress();
    }
  }, [foundation]);

  const getFoundationByAddress = async () => {
    let configRequest = {
      type: "get",
      endpoint: "foundation/get-foundation-by-wallet/" + address,
      data: {},
    };
    const response = await request(configRequest);
    if (response.success) {
      setFoundation(response.foundation);
      setIsOwner(user.get('ethAddress') === response.foundation.ethAddress)
    }
  };

  const setActive = (index) => {
    let arrAux = [...options];
    arrAux.forEach((item) => {item.isActive = false});
    arrAux[index].isActive = true;
    setOptions(arrAux);
  }

  return (
    <div className="container">
      <HeaderFoundation foundation={foundation} isOwner={isOwner} />

      <nav className="navbar-details-foundation d-flex">
        {options.map((item, key) => (
          <TextWithTopLine
            key={key}
            padding={"1rem 0"}
            fontSize="1.25rem"
            fontWeight={item.isActive ? 600 : 300}
            borderTop={item.isActive ? null : "5px solid transparent"}
            onClick={() => setActive(key)}
            cursor={"pointer"}
          >
            {item.option}
          </TextWithTopLine>
        ))}
        {/* <Link to="/">
                    <TextWithTopLine padding={'1rem 0'} fontSize="1.25rem" fontWeight={600} >About Us</TextWithTopLine>
                </Link> */}
      </nav>

      <AboutAs foundation={foundation} />

      {/** 
            <Posts foundation={foundation} />
*/}
    </div>
  );
};

export default FoundationDetails;
