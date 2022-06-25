import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import "./Home.css";
import { toast } from "react-toastify";
import CustomDropzone from "../../components/CustomDropzone";
import useHttp from "../../hooks/useHttp";

const Home = () => {
  const { authenticate, logout, isAuthenticated, user, authError } =
    useMoralis();
  const {error,isLoading,request} = useHttp();
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
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


  const upload = async () => {
    let collection = [];
    let base64;
    for(let i = 0; i < fileInfo.length; i++){
      base64 = await toBase64(fileInfo[i].file);
      collection.push({
        file: base64,
        name: fileInfo[i].name,
        description: fileInfo[i].description
      })
    }
    let configRequest = {
      type: "post",
      endpoint: "nft/create-nft",
      data: {
        collection: collection
      }
    }
    const response = await request(configRequest);
  }

  const handleChange = (e, index) => {
    let arrAux = [...fileInfo];
    arrAux[index][e.target.name] = e.target.value;
    setFileInfo(arrAux);
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
              <input className="w-100" name="name" onChange={(e) => handleChange(e, index)} value={file.name} />
              <br /><br />
              <textarea className="w-100" name="description" onChange={(e) => handleChange(e, index)} rows={6} placeholder="Description..."></textarea>
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
