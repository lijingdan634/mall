import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default{
  addCart(context, payload){
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    // console.log(oldProduct);
    if(!oldProduct){
      context.commit(ADD_TO_CART, payload);
    }else{
      context.commit(ADD_COUNTER, oldProduct);
    }

  }
}