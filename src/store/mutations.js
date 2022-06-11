import {ADD_COUNTER, ADD_TO_CART,DEC_COUNTER} from './mutation-types'
export default{
  [ADD_COUNTER](state, payload){
    payload.count +=1
  },
  [DEC_COUNTER](state, payload){
    payload.count -=1
  },
  [ADD_TO_CART](state, payload){
    payload.checked = false
    payload['count'] = 1
    state.cartList.push(payload)
  }
}