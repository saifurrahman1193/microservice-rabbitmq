const checkIsError = (errors=[], field) => {
    const searchItem = field;
    const foundError = errors.find((error) => error.path === searchItem);

    return foundError ? true : false;
}

const getErrorMessage = (errors=[], field) => {
    const searchItem = field;
    const foundError = errors.find((error) => error.path === searchItem);

    return foundError?.msg;
}


export  {
    checkIsError, getErrorMessage
}