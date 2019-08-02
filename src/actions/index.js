import * as types from './../constants/ActionTypes'
export const listAll =()=> {
    return {
        type: types.LIST_ALL
    }
}
export const addTask=task=>{
    return{ 
        type: types.ADD_TASK,
        task:task
    }
}
export const toggleform = ()=>{
    return {
        type: types.TOGGLE_FORM
    }
}
export const openform = ()=>{
    return {
        type: types.OPEN_FORM
    }
}
export const closeform = ()=>{
    return {
        type: types.CLOSE_FORM
    }
}