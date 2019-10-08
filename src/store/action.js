import * as types from './action-type'

// 修改浏览记录
export const setRouteRecord = (routes) => {
    return {
        type: types.ROUTE_RECORD,
        routes
    }
}
///记录用户信息
export const setUser = (user) => {
    return {
        type: types.USER,
        user
    }
}
export const setTest = (test) => {
    return {
        type: types.TEST,
        test
    }
}



