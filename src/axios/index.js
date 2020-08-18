import React from 'react'
import axios from 'axios'

// axios 相关配置
axios.defaults.baseURL = 'http://47.96.21.88:8086'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(localStorage.getItem('token')) {
        config.headers.Authorization = localStorage.getItem('token')
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
React.Component.prototype.axios = axios