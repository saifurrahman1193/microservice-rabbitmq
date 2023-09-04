import axios from "axios";
// import { store } from '../redux/store'
// import { USER_LOGOUT } from '../redux/action'


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] = 'application/json'

export const getCall = async (url, token = null, lan = 'en') => {
    try {
        let res = await axios.get(url, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
                lang: lan,
            },
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

export const postCall = async (path, data, token = null, headers={}) => {
    try {
        // alert(path+' '+token)
        let res = await axios.post(API_BASE_URL+path, data, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
                ...headers
            },
        });
        if (res?.data?.code != 200) {
            if ([401, 403]?.includes(res?.data?.code) ) {
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
        console.log("error", error);
        return {};
    }
};


const logout_cleaner = () => {
    
    window.location.href = '/'
    let backdrops = document.querySelectorAll('.modal-backdrop')
    backdrops.forEach(element => {
        element.remove()
    });
}

