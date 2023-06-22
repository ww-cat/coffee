import request from '../utils/request.js'

export function getType(params) {
    return request({
        url: 'type',
        method: 'GET',
        params
    })
}