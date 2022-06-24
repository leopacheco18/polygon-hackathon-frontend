import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import "./Home.css";
import { toast } from "react-toastify";
import CustomDropzone from "../../components/CustomDropzone";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
console.log("backendUrl",backendUrl)
const Home = () => {
  const { authenticate, logout, isAuthenticated, user, authError } =
    useMoralis();

  const [fileInfo, setFileInfo] = useState([]);

  useEffect(() => {
    if (authError && authError.message) {
      toast.error(authError.message);
    }
  }, [authError]);

  const removeFile = index => {
    let arrAux = [...fileInfo];
    arrAux.splice(index,1)
    setFileInfo(arrAux)
  }

  const upload = () => {

  }

  return (
    <div>
      Home
      {isAuthenticated ? (
        <button onClick={logout}>LogOut</button>
      ) : (
        <button onClick={authenticate}>Metamask</button>
      )}
      <br />
      <CustomDropzone fileInfo={fileInfo} setFileInfo={setFileInfo} />
      <div className="home-files-container">
        {fileInfo.map((file,index) => (
          <>
            <div className="w-20">
              <img className="w-100" src={file.file.preview} alt="file" />
            </div>
            <div className="w-70">
              <input className="w-100" value={file.name} />
              <br /><br />
              <textarea className="w-100" rows={6} placeholder="Description..."></textarea>
            </div>
            <div className="w-5">
              <button onClick={() => removeFile(index)}>Eliminar</button>
            </div>
          </>
        ))}
      </div>
      <button onClick={upload}>Upload</button>
    </div>
  );
};

export default Home;
