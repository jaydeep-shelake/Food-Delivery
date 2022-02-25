import { SHOW_SIDEBAR } from "../actions/types";


export const sidebarReducer=(state={show:false},action)=>{
    switch(action.type){
        case SHOW_SIDEBAR:
           return {...state,show:action.payload}
        default:
            return state
         }
}