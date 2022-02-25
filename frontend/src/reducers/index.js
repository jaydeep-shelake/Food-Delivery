import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import pizzaReducer from "./pizzaReducers";
import {signInReducer,signUpReducer} from './authReducer'
import { addressReducer } from "./addressReducer";
import { orderReducer,orderDetail, searchItems } from "./odersReducer";
import { wishlistReducer } from "./wishlistReducer";
import { sidebarReducer } from "./sidebarreducer";
export default combineReducers({
    allPizza:pizzaReducer,
    cart:cartReducer,
    user:signInReducer,
    userRegister:signUpReducer,
    address:addressReducer,
    order:orderReducer,
    orderDetails:orderDetail,
    search:searchItems,
    wishlist:wishlistReducer,
    sidebar:sidebarReducer
})