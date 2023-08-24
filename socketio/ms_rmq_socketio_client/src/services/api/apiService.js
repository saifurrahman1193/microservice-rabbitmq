import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


export const fetchData = async (config) => {
    const {
        method,
        baseURL,
        url,
        headers,
        params,
        timeout,
        responseType,
        data,
        token,
        onUploadProgress,
        onDownloadProgress,
        maxContentLength,
        proxy,
        decompress,
        contentType,
    } = config;

    try {
        const response = await axios({
            method,
            baseURL: baseURL || API_BASE_URL,
            url,
            headers: {
                Accept: contentType || 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: token ? `Bearer ${token}` : "",
                ...headers,
            },
            params,
            timeout,
            responseType,
            data,
            onUploadProgress,
            onDownloadProgress,
            maxContentLength,
            proxy,
            decompress,
        });

        return response?.data;
    } catch (error) {
        console.error("Error:", error);
        return {};
    }
};
