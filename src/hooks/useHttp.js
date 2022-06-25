
import React, { useState } from 'react'
import axios from 'axios';
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const headers = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
  }
const useHttp = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    
    const request = async (configRequest) => {
        setIsLoading(true);
        const response = await axios[configRequest.type](backendUrl + configRequest.endpoint, configRequest.data,{ headers: headers});
        console.log(response);
        setIsLoading(false);
        return response.data;
    }

  return {isLoading, error, request}
}

export default useHttp