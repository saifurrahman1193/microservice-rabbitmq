export const addParameterToURL = (url, paramName, paramValue) => {
    const urlObj = new URL(url);
    urlObj.searchParams.set(paramName, paramValue);
    return urlObj.toString();
}

export const removeParameterFromURL = (url, paramName) => {
    const urlObj = new URL(url);
    urlObj.searchParams.delete(paramName);
    return urlObj.toString();
}
