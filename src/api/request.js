import axios from 'axios'
import Cookie from 'js-cookie'
import store from '@/store'


const service = axios.create({
    'baseURL': 'http://canzg-wsl.itheima.net:8081/', // 'http://161.189.152.255:8081/',  // 'http://canzg-wsl.itheima.net/enterpise', // https://mock.boxuegu.com/mock/872/', // 'http://172.16.43.139:8081/', // 'http://39.98.133.55:8081/', // https://mock.boxuegu.com/mock/872/', // process.env.VUE_APP_BASE_API,
    'timeout': 5000
});

// Request interceptors
service.interceptors.request.use(
    config => {
        store.commit('getToken')
        let token = store.state.user.token
        if (token) {
            config.headers['authorization'] = token;
        }
        config.headers['Access-Control-Allow-Origin'] = '*';
        config.headers['Content-Type'] = 'application/json;';
        return config;
    },
    err=>console.log(err)
);

// Response interceptors
service.interceptors.response.use(
    response => {
        let res ={}
        res.data = response.data
        return res
    },
    err => {
        this.$message({
            message: err.message,
            type: 'error',
            duration: 5 * 1000
        });
        console.log(err);
    }
);

export default service;
