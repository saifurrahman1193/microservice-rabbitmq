export const addParameterToURL = (url: string, paramName: string, paramValue: string): string => {
    const urlObj = new URL(url);
    urlObj.searchParams.set(paramName, paramValue);
    return urlObj.toString();
  }
  
  export const removeParameterFromURL = (url: string, paramName: string): string => {
    const urlObj = new URL(url);
    urlObj.searchParams.delete(paramName);
    return urlObj.toString();
  }
  