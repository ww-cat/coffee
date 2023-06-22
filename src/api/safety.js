import request from '../utils/request.js'

export function updatePassword(params) {
    return request({
        url: 'updatePassword',
        method: 'POST',
        data: params
    })
}



export function logout(params) {
    return request({
        url: 'logout',
        method: 'POST',
        data: params
    })
}

export function destroyAccount(params) {
    return request({
        url: 'destroyAccount',
        method: 'POST',
        data: params
    })
}
