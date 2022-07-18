import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import "./Home.css";
import { toast } from "react-toastify";
import CustomDropzone from "../../components/CustomDropzone";
import useHttp from "../../hooks/useHttp";
import Logo from "../../components/global/Logo";
import DarkButton from "../../components/global/DarkButton";
import homeWomen from "./../../assets/home/women.png";
import homeMan from "./../../assets/home/man.png";
import metamaskLogo from "./../../assets/logo/metamask_logo.png";
import Altair from "./../../assets/home/Altair.png";
import Leo from "./../../assets/home/Leo.png";
import Crome from "./../../assets/home/Crome.png";
import Wayner from "./../../assets/home/Wayner.png";
import Mario from "./../../assets/home/Mario.png";
import TeamCard from "../../components/home/TeamCard";

const team = [
  { img: Altair, name: "Altair", role: "Mobile Developer" },
  { img: Leo, name: "Leo", role: "Frontend Developer" },
  { img: Crome, name: "Crome", role: "Smart Contract Developer" },
  { img: Wayner, name: "Wayner", role: "Backend Developer" },
  { img: Mario, name: "Mario", role: "Web/Mobile Designer" },
];

const Home = () => {
  // NEW PAGE

  const { authenticate, authError } = useMoralis();

  useEffect(() => {
    if (authError && authError.message) {
      toast.error(authError.message);
    }
  }, [authError]);

  return (
   <>
    <div className="home-container">
      <div className="d-flex">
        <div className="w-10 logo-container">
          <Logo />
        </div>
        <div className="w-90 text-right d-flex justify-end home-metamask-button">
          <DarkButton onClick={authenticate}>
            <img
              alt="metamask-logo"
              src={metamaskLogo}
              className="home-metamask-logo"
            />
            Connect your Wallet
          </DarkButton>
        </div>
      </div>
      <div className="home-card d-flex">
        <div className="w-60 ">
          <div className="home-card-content">
            <h1>
              Openness <br /> Charity Projects or Foundations
            </h1>
            <p>
              Display your charity project, foundations or donation <br /> cause
              with transparency
            </p>
          </div>
        </div>
        <div className="w-40 home-card-image ">
          <img src={homeWomen} alt="women" />
        </div>
      </div>
      <div className="d-flex home-overview">
        <div className="w-40 text-right">
          <img alt="home-man" src={homeMan} className="w-100" />
        </div>
        <div className="w-40 d-flex home-overview-content">
          <div className="home-overview-border">
            <h2>Overview</h2>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus. Maecenas eget condimentum velit, sit amet
            feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
            enim egestas, ac scelerisque ante pulvinar.
          </p>
        </div>
      </div>
      <div className="our-team-container">
        <div className="home-overview-border">
          <h2>Our Team</h2>
        </div>
        <div className="d-flex position-relative team-card-list">
          {team.map((item, index) => (
            <TeamCard {...item} isTop={index % 2 === 0} />
          ))}
        </div>
      </div>
    </div>
    <div className="home-footer">
    © 2022 | Web Design MP | All Rights Reserved
    </div>
    </>
  );

  // OLD PAGE
  //   const { authenticate, logout, isAuthenticated, user, authError } =
  //     useMoralis();
  //   const {error,isLoading,request} = useHttp();
  //   const [fileInfo, setFileInfo] = useState([]);

  //   useEffect(() => {
  //     if (authError && authError.message) {
  //       toast.error(authError.message);
  //     }
  //   }, [authError]);

  //   const removeFile = index => {
  //     let arrAux = [...fileInfo];
  //     arrAux.splice(index,1)
  //     setFileInfo(arrAux)
  //   }
  //   const toBase64 = file => new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = error => reject(error);
  // });

  //   const upload = async () => {
  //     let collection = [];
  //     let base64;
  //     for(let i = 0; i < fileInfo.length; i++){
  //       base64 = await toBase64(fileInfo[i].file);
  //       collection.push({
  //         file: base64,
  //         name: fileInfo[i].name,
  //         description: fileInfo[i].description
  //       })
  //     }

  //     let configRequest = {
  //       type: "post",
  //       endpoint: "nft/create-nft",
  //       data: {
  //         collection: collection
  //       }
  //     }
  //     const response = await request(configRequest);
  //   }

  //   const handleChange = (e, index) => {
  //     let arrAux = [...fileInfo];
  //     arrAux[index][e.target.name] = e.target.value;
  //     setFileInfo(arrAux);
  //   }
  // return (
  //   <div>
  //     Home
  //     {isAuthenticated ? (
  //       <button onClick={logout}>LogOut</button>
  //     ) : (
  //       <button onClick={authenticate}>Metamask</button>
  //     )}
  //     <br />
  //     <CustomDropzone setFileInfo={(arr) => {
  //       let arrAux = [...fileInfo];
  //       arr.forEach((item) => {
  //         arrAux.push(item);
  //       })
  //        setFileInfo(arrAux);
  //     }} />
  //     <div className="home-files-container">
  //       {fileInfo.map((file,index) => (
  //         <>
  //           <div className="w-20">
  //             <img className="w-100" src={file.file.preview} alt="file" />
  //           </div>
  //           <div className="w-70">
  //             <input className="w-100" placeholder="name..." name="name" onChange={(e) => handleChange(e, index)} value={file.name} />
  //             <br /><br />
  //             <textarea className="w-100" name="description" onChange={(e) => handleChange(e, index)} rows={6} placeholder="Description..."></textarea>
  //             <br/> <br />
  //             <input className="w-100" placeholder="price..." name="price" onChange={(e) => handleChange(e, index)} value={file.price} />
  //           </div>
  //           <div className="w-5">
  //             <button onClick={() => removeFile(index)}>Eliminar</button>
  //           </div>
  //         </>
  //       ))}
  //     </div>
  //     <button onClick={upload}>Upload</button>
  //   </div>
  // );
};

export default Home;