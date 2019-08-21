import * as types from '../constants/ActionTypes'
var initialState = {
        name:'',
        status:-1//-1: lay tat ca
}
var myReducer = (state=initialState,action)=>{
    switch(action.type){
        case types.FILTER_TABLE:
                console.log(action)
                action.filter.status=parseInt(action.filter.status)
                return action.filter
        default: return state
        }
}
export default myReducer 