import request from '../utils/request'

export function getProductDetail(params) {
    return request({
        url: 'productDetail',
        method: 'GET',
        params
    })
}

export function addShopBag(data){
    return request({
        url: 'addShopcart',
        method: 'POST',
        data: data
    })
}

// 根据商品pid查询收藏商品接口
export function findLike(params){
    return request({
        url: 'findlike',
        method: 'GET',
        params
    })
}

// 收藏商品
export function like(params){
    return request({
        url: 'like',
        method: 'POST',
        data: params
    })
}

// 取消(删除)收藏商品接口
export function deleteCollect(params){
    return request({
        url: 'notlike',
        method: 'POST',
        data: params
    })
}



export function shopCartCount(params){
    return request({
        url: 'shopcartCount',
        method: 'GET',
        params
    })
}
