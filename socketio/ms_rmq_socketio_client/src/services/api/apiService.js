import axios from "axios";
// import { store } from '../redux/store'
// import { USER_LOGOUT } from '../redux/action'


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] = 'application/json'

export const getCall = async (url, params, token = null) => {
    try {
        let res = await axios.get(API_BASE_URL + url, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            },
            params: params,
        })
        if (res?.data?.code === 401) {
            localStorage.removeItem('user')
            localStorage.removeItem('roles')
            localStorage.removeItem('permissions')
            // store.dispatch(USER_LOGOUT())
            return res?.data
        } else {
            return res?.data;
        }

    } catch (error) {
        console.log("error", error);
        return {};
    }
};

export const postCall = async (url, data, token = null, headers = {}) => {
    try {
        // alert(url+' '+token)
        let res = await axios.post(API_BASE_URL + url, data, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
                ...headers
            },
        });

        if (res?.data?.code !== 200) {
            if ([401, 403]?.includes(res?.data?.code)) {
                // alert(JSON.stringify(res))
                localStorage.removeItem('user')
                localStorage.removeItem('roles')
                localStorage.removeItem('permissions')
                // store.dispatch(USER_LOGOUT())
                logout_cleaner()
            }
            return res?.data
        } else {
            return res?.data;
        }

    } catch (error) {
        return error?.response?.data;
    }
};

export const putCall = async (url, data, token = null, headers = {}) => {
    try {
        // alert(url+' '+token)
        let res = await axios.put(API_BASE_URL + url, data, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
                ...headers
            },
        });

        if (res?.data?.code !== 200) {
            if ([401, 403]?.includes(res?.data?.code)) {
                // alert(JSON.stringify(res))
                localStorage.removeItem('user')
                localStorage.removeItem('roles')
                localStorage.removeItem('permissions')
                // store.dispatch(USER_LOGOUT())
                logout_cleaner()
            }
            return res?.data
        } else {
            return res?.data;
        }

    } catch (error) {
        return error?.response?.data;
    }
};

export const patchCall = async (url, data, token = null, headers = {}) => {
    try {
        // alert(url+' '+token)
        let res = await axios.patch(API_BASE_URL + url, data, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
                ...headers
            },
        });

        if (res?.data?.code !== 200) {
            if ([401, 403]?.includes(res?.data?.code)) {
                // alert(JSON.stringify(res))
                localStorage.removeItem('user')
                localStorage.removeItem('roles')
                localStorage.removeItem('permissions')
                // store.dispatch(USER_LOGOUT())
                logout_cleaner()
            }
            return res?.data
        } else {
            return res?.data;
        }

    } catch (error) {
        return error?.response?.data;
    }
};



export const deleteCall = async (url, data, token = null, headers = {}) => {
    try {
        // alert(url+' '+token)
        let res = await axios.delete(API_BASE_URL + url, data, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
                ...headers
            },
        });

        if (res?.data?.code !== 200) {
            if ([401, 403]?.includes(res?.data?.code)) {
                // alert(JSON.stringify(res))
                localStorage.removeItem('user')
                localStorage.removeItem('roles')
                localStorage.removeItem('permissions')
                // store.dispatch(USER_LOGOUT())
                logout_cleaner()
            }
            return res?.data
        } else {
            return res?.data;
        }

    } catch (error) {
        return error?.response?.data;
    }
};


const logout_cleaner = () => {

    window.location.href = '/'
    let backdrops = document.querySelectorAll('.modal-backdrop')
    backdrops.forEach(element => {
        element.remove()
    });
}

