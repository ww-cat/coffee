import request from '../utils/request.js'

export function getUserInfo(params) {
    return request({
        url: 'findAccountInfo',
        method: 'GET',
        params
    })
}

export function getUserCollect(params) {
    return request({
        url: 'findAllLike',
        method: 'GET',
        params
    })
}

export function getUserAddress(params) {
    return request({
        url: 'findAddress',
        method: 'GET',
        params
    })
}


export function addUserAddress(params) {
    return request({
        url: 'addAddress',
        method: 'POST',
        data: params
    })
}

export function editAddress(params) {
    return request({
        url: 'editAddress',
        method: 'POST',
        data: params
    })
}


export function deleteAddress(params) {
    return request({
        url: 'deleteAddress',
        method: 'POST',
        data: params
    })
}


export function findMy(params) {
    return request({
        url: 'findMy',
        method: 'GET',
        params
    })
}

