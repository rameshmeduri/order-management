import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder
} from '../actions/orderActions';

class OrderList extends Component {

  state = {
    mode: 'create',
    _id: '',
    category: '',
    quantity: '',
    shipDate: '',
    status: ''
  };

  showUpdateModal = (o) => {
    return (e) => {
      let tempObj = {
        mode: 'update',
        _id: o._id,
        category: o.category,
        quantity: o.quantity,
        shipDate: o.shipDate,
        status: o.status
      };
      this.setState(tempObj, () => {
        window.$('#current-order').modal();
      });
    };
  }

  removeOrder = (id) => {
    return () => {
      this.props.deleteOrder(id);
    };
  };

  componentDidMount() {
    console.log('componentDidMount() {');
    this.props.getOrders();
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.mode === 'update') {
      let payload = {
        _id: this.state._id,
        category: this.state.category,
        quantity: this.state.quantity,
        shipDate: this.state.shipDate,
        status: this.state.status
      }
      this.props.updateOrder(payload);
    } else {
      let payload = {
        category: this.state.category,
        quantity: this.state.quantity,
        shipDate: this.state.shipDate
      }
      this.props.createOrder(payload);
    }

    window.$('#close').click();
  }

  onChange = (item) => {
    return (e) => {
      let v = e.target.value;
      this.setState({ [item]: v });
    };
  }

  showCreateModal = () => {
    let tempObj = {
      mode: 'create',
      _id: '',
      category: '',
      quantity: '',
      shipDate: '',
      status: ''
    };
    this.setState(tempObj, () => {
      window.$('#current-order').modal();
    });
  }

  orderModal() {
    return (
      <div
        id="current-order"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="current-order"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <form onSubmit={this.onSubmit}>
              <div className="modal-header">

                <h5 className="modal-title">
                  {(this.state.mode === 'update') ? 'Update Order' : 'Create Order'}
                </h5>

                <button type="button" className="close" id="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label className="col-form-label">Category:  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.category}
                    onChange={this.onChange('category')}
                  />
                </div>
                <div className="form-group">
                  <label className="col-form-label">Quantity:  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={this.state.quantity}
                    onChange={this.onChange('quantity')}
                  />
                </div>
                <div className="form-group">
                  <label className="col-form-label">ShipDate: </label>
                  <input
                    type="date"
                    className="form-control"
                    value={moment(this.state.shipDate).format('YYYY-MM-DD')}
                    onChange={this.onChange('shipDate')}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-secondary btn-sm">
                  {(this.state.mode === 'update') ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  tableRows() {
    console.log('tableRows() {');
    let arr = this.props.orders.orderList;
    if (arr && arr.length) {
      return arr.map((obj, i) => {
        let { _id, category, quantity, shipDate, status } = obj;
        return (
          <tr key={i}>
            <td>{_id}</td>
            <td>{category}</td>
            <td>{quantity}</td>
            <td>{moment(shipDate).format('YYYY-MM-DD')}</td>
            <td>{status}</td>
            <td><span onClick={this.showUpdateModal(obj)}><i className="far fa-edit"></i></span></td>
            <td><span onClick={this.removeOrder(_id)}><i className="fas fa-trash-alt"></i></span></td>
          </tr>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <h3 className="text-center">Orders</h3>
        <div style={{ textAlign: 'right', margin: '10px 0 20px 0' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={this.showCreateModal}
          >Create Order</button>
        </div>
        {this.orderModal()}
        <table className="table table-hover" id="order-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>ShipDate</th>
              <th>Status</th>
              <th>#</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>{this.tableRows()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  orders: state.orders
});

export default connect(mapStateToProps, {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder
})(OrderList);
