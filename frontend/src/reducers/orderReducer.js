import {
  CREATE_ORDER,
  GET_ORDERS,
  UPDATE_ORDER,
  DELETE_ORDER
} from '../actions/types';

const initialState = {
  orderList: []
};

export default function (state = initialState, action) {
  switch (action.type) {

    case GET_ORDERS:
      return {
        ...state,
        orderList: action.payload
      };

    case CREATE_ORDER:
      return {
        ...state,
        orderList: [action.payload, ...state.orderList]
      };

    case UPDATE_ORDER: {
      const newArr = state.orderList.map((item) => {
        if (item._id === action.payload._id) {
          return { ...item, ...action.payload };
        }
        return item;
      });

      return {
        ...state,
        orderList: newArr
      };

    }

    case DELETE_ORDER: {      
      return {
        ...state,
        orderList: state.orderList.filter((o) => o._id !== action.payload)
      };
    }


    default:
      return state;
  }
}
