import request from '@/utils/request'

export function searchByKey(params) {
    return request({
        url: 'search',
        method: 'GET',
        params
    })
}
