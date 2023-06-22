import request from "@/utils/request";

export function getUserShopBag(params) {
    return request ({
        url: 'findAllShopcart',
        method: 'GET',
        params
    })
}



export function removeShopCart(params) {
    return request ({
        url: 'removeShopcart',
        method: 'POST',
        data: params
    })
}


export function modifyShopCartCount(params) {
    return request ({
        url: 'modifyShopcartCount',
        method: 'POST',
        data: params
    })
}
