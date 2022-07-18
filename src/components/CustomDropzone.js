import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
const CustomDropzone = ({setFileInfo}) => {
  const onDrop = useCallback((acceptedFiles) => {
    let arrAux = [];
    acceptedFiles.forEach(file => {
      arrAux.push({
        file: Object.assign(file, {
          preview: URL.createObjectURL(file)
        }),
        name: file.name,
      })
      setFileInfo(arrAux);
    });

  }, [setFileInfo]);
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
