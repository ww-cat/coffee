import request from "@/utils/request";

export function payShopBag(params) {
    return request ({
        url: 'pay',
        method: 'POST',
        data: params
    })
}
//请求参数 appkey: 你的appkey, tokenString: token字符串, status: 订单状态
// 其中 status 值为 0, 1, 2 ==> 0: 全部，1: 进行中，2: 已完成
export function findOrder(params) {
    return request ({
        url: 'findOrder',
        method: 'GET',
        params
    })
}

// 删除订单
export function removeOrder(params) {
    return request ({
        url: 'removeOrder',
        method: 'POST',
        data: params
    })
}

// 确认收货
export function receive(params) {
    return request ({
        url: 'receive',
        method: 'POST',
        data: params
    })
}
