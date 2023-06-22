import request from '@/utils/request'
// 上传头像
export function updateUserBg(params) {
    return request({
        url: 'updateUserBg',
        method: 'POST',
        data: params
    })
}

// 上传用户背景
export function updateAvatar(params) {
    return request({
        url: 'updateAvatar',
        method: 'POST',
        data: params
    })
}
