import * as types from './action-type'

//创建一个容器: 需要把reducer 传递进来(登记了所有状态更改的信息)
import { createStore } from 'redux';
/*reducer 作用:
    1.  记录了所有状态修改的信息(根据行为标识走不同的修改任务)
    2.  修改容器中的状态信息
    [参数]
        state:容器中原有的状态信息(如果第一次使用,没有原有状态,给一个厨师默认值
        action: dispatch 任务派发的时候传递的行为对象(这个对象中必有一个type属性,是操作的行为标识,
        reducer 就是根据这个行为标识来识别修改状态信息
* */
let defaultState = {
    routesList: new Set(),   // 路由浏览记录
    user:null,
    test:'origin'
    
}
let reducer = (state = defaultState, action) => {
    switch (action.type) {
        case types.ROUTE_RECORD:
            console.log(action.routes)
            return Object.assign({}, state, { routesList: new Set([...action.routes])})
            // setTimeout(() => {
            //     state = { ...state, routesList: action.routes };
            // }, 2000);react 本身的redux 是不支持异步的
            break;
        case types.USER:
            sessionStorage.setItem('user', JSON.stringify(action.user))
            return Object.assign({}, state, { user: action.user })
            break;
        case types.TEST:
            return Object.assign({}, state, { test: action.test })
            break;
        default:
            return state;
       
    }
};
let store = createStore(reducer);
export default store;