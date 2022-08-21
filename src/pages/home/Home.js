import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import "./Home.css";
import { toast } from "react-toastify";
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
import TextWithTopLine from "../../components/global/TextWithTopLine";

const team = [
  { img: Altair, name: "Altair", role: "Mobile Developer" },
  { img: Leo, name: "Leo", role: "Frontend Developer" },
  { img: Crome, name: "Crome", role: "Smart Contract Developer & Content Creator" },
  { img: Wayner, name: "Wayner", role: "Cloud Architect & Backend Developer" },
  { img: Mario, name: "Mario", role: "UI/UX Designer" },
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
      <div className="d-flex container-header">
        <div className="w-15 logo-container">
          <Logo />
          </div>
          <div className="w-85 text-right d-flex justify-end home-metamask-button">
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
                Charity and <br /> Non-profit projects with transparency

              </h1>
              <p>
                Bring DeFi to charity organizations and projects,  <br />engaged with Dao systems and NFT Martkets
                
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
            <TextWithTopLine>Overview</TextWithTopLine>
            <p>
              Donaty is the ultimate platform for Charities and Non-Profit organizations, allowing entities to create real impact projects on their communities and countries. NFT Artists can contribute to a charity proposal, selling their art and engaging into an Autonomous Decentralized Organization (DAO), NFT owners of each project will vote to decide if the funding is being used correctly as the charity responsible will have to upload regular updates stating the progress of their campaign.
            </p>
          </div>
        </div>
        <div className="our-team-container">
          <TextWithTopLine>Our Team</TextWithTopLine>
          <div className="d-flex position-relative team-card-list">
            {team.map((item, index) => (
              <TeamCard {...item} isTop={index % 2 === 0} key={index} />
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
