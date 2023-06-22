import request from '../utils/request'

export function getBanners(params) {
    return request({
        url: 'banner',
        method: 'GET',
        params
    })
}

export function getTypeProducts(params) {
    return request({
        url: 'typeProducts',
        method: 'GET',
        params
    })
}