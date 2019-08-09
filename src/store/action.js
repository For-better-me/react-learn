import * as types from './action-type'

// 修改浏览记录
export const setRouteRecord = (routes) => {
    return {
        type: types.ROUTE_RECORD,
        routes
    }
}



