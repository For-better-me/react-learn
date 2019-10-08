import axios from 'axios'
import { message} from 'antd';
const Axios = axios.create({
    timeout: 100000,
})
Axios.interceptors.request.use(config => {
    if (config.url.indexOf('DeviceService') == -1) {
        config.baseURL = 'http://192.168.3.22:8099/Service/API/V1/DXA'
    } else {
        config.baseURL = 'http://192.168.3.22:8098/Service/API/V1/DXA'
    }
    return config;
}, error => {  //请求错误处理

    Promise.reject(error)
});
Axios.interceptors.response.use(function (res) {
    if (res.data.code == 0) {
        return res.data;
    } else if (res.data.code == 1) {
        message.error(res.data.message);
        return Promise.reject(res.data);
    } else {
        return Promise.reject(res.data);
    }

}, function (error) {
   
    return Promise.reject(error)

});
export default Axios