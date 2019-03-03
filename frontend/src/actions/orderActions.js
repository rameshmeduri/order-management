import axios from 'axios';

import {
  CREATE_ORDER,
  GET_ORDERS,
  UPDATE_ORDER,
  DELETE_ORDER
} from './types';

const createOrder = (payload) => (dispatch) => {
  axios
    .post('/api/order', payload)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: CREATE_ORDER, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getOrders = () => (dispatch) => {
  axios
    .get('/api/order')
    .then((res) => {
      console.log(res.data);
      dispatch({ type: GET_ORDERS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateOrder = (payload) => (dispatch) => {
  axios
    .put(`/api/order/${payload._id}`, payload)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: UPDATE_ORDER, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteOrder = (id) => (dispatch) => {
  axios
    .delete(`/api/order/${id}`)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: DELETE_ORDER, payload: id });
    })
    .catch((err) => {
      console.log(err);
    });
};

export {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder
};
