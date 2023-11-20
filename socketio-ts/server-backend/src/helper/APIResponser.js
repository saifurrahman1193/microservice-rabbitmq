export const set_response = (res, data, status_code, status, details, errors=null) => {

    return res.status(status_code || 200).json(
        {
            "status": status,
            "code": status_code,
            "data": data,
            "message": details,
            "errors":errors
        }
    );
}