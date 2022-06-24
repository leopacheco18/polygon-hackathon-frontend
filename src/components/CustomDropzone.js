import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
const CustomDropzone = ({setFileInfo, fileInfo}) => {
  const onDrop = useCallback((acceptedFiles) => {
    let arrAux = [...fileInfo];
    acceptedFiles.forEach(file => {
      arrAux.push({
        file: Object.assign(file, {
          preview: URL.createObjectURL(file)
        }),
        name: file.name,
      })
      console.log(arrAux);
      setFileInfo(arrAux);
    });

  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div  {...getRootProps({className: 'dropzone'})}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default CustomDropzone;
