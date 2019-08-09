//index.js

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
    routesList: [
        {
            path:'/home',
            name:'用户信息'
        },
        {
            path: '/detail',
            name: '基础表单'
        }
    ],   // 路由浏览记录
    
}
let reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ROUTE_RECORD':
            //vote_support
            state = { ...state, routesList: action.routes};
            break;
       
    }
    return state;// 只有把最新的state返回,原有的状态才会修改
};
let store = createStore(reducer);
export default store;