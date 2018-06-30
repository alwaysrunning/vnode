import Vue from 'vue'
import axios from 'axios'
import querystring from 'querystring';
import { Message } from 'element-ui';
import { url} from '../../config'

axios.defaults.withCredentials = true
axios.defaults.timeout = 10000
//请求拦截器
axios.interceptors.request.use(config=>{
    config.url = `${url}${config.url}`
    return config
}, err=>{
    return Promise.reject(err)
})

//响应拦截器
axios.interceptors.response.use(config=>{
    return config
},err=>{
    if(err && err.response){
        switch (err.response.status){
            case 400:
                err.message = '错误请求'
                break;
            case 401:
                err.message = '未授权，请重新登录'
                break;
            case 403:
                err.message = '拒绝访问'
                break;
            case 404:
                err.message = '未找到该资源'
                break;
            case 500:
                err.message = '服务器端出错'
                break;
            case 504:
                err.message = '网络超时'
                break;
        }
        Message.error(err.message);
        return Promise.reject(err)
    }
})

Vue.prototype.$ajax = {
    get(url, param){
        return axios.get(url,{
            params:param||{}
        }).then(res=>{
            return Promise.resolve(res.data)
        })
    },
    post(url, data){
        //let param = querystring.stringify(data)
        let param = data  // nodejs
        return axios.post(url, param).then(res=>{
            return Promise.resolve(res.data)
        })
        // return new Promise((resolve, reject)=>{
        //     axios.get(url,{
        //         params:param||{}
        //     }).then(res=>{
        //         resolve(res)
        //     })
        // })
    }
}

