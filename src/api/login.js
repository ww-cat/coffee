import request from '../utils/request'

export function register(data) {
    return request ({
        url: 'register',
        method: 'POST',
        data: data
    })
}
export function login(data) {
    return request ({
        url: 'login',
        method: 'POST',
        data: data
    })
}

export function getValidCode(data){
    return request({
        url: 'emailValidCode',
        method: 'POST',
        data
    })
}



export function retrievePassword(data){
    return request({
        url: 'retrievePassword',
        method: 'POST',
        data: data
    })
}
