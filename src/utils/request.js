import axios from 'axios'
import Vue from 'vue'

const request = axios.create({
    baseURL: 'http://www.kangliuyong.com:10002',
    withCredentials: true,
    timeout: 5000
})

export default request