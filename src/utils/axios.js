import axios from 'axios';
import config from '@/api/config/config';

var instance = axios.create({
    headers:{
        'Content-Type': 'application/json',
    },
    timeout: 180000, // 请求超时时间
    baseURL: config.baseUrl, // api的base_url
})

instance.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error);
})

instance.interceptors.response.use(response => {
    const res = response.data;
    return response;
}, error => {
    return Promise.reject(error);
});

export default instance;

/**
 * 封装所有请求
 * @param methed
 * @param url
 * @param data 
 * @param headers
 * @returns {Promise}
 */
export function request(methed,url, data = {},headers) {
    return new Promise((resolve, reject) => {
        instance({
            method: methed || 'post',
            url:url,
            params: methed === 'get' ? data :'',
            data: methed !== 'get' ?  data :'',
            headers: headers || {'Content-Type':'application/json'},
        })
        .then(response => {
            resolve(response.data);
        })
        .catch(err => {
            reject(err)
        })
    })
}