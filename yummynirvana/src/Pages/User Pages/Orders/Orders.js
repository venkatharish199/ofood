import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Alert } from 'react-bootstrap';
import Footer from '../../../Components/Footer/Footer';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const token = sessionStorage.getItem('token');
  //console.log(token);
  const config = {
    headers: {
      'Authorization': `Bearer ${token}` // Set the token in the Authorization header
    }
  };

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      fetchOrders(userId);
    }
  }, []);

  const fetchOrders = async (userId) => {
    try {
      const response = await axios.get(`https://localhost:7243/api/Orders/GetOrdersByUser?userId=${userId}`, config);
      const sortedOrders = response.data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
      setOrders(sortedOrders);
      //setOrders(response.data);
    } catch (err) {
      setError('Failed to fetch orders');
    }
  };

  return (
    <div>
      <h2>My Orders</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Products</th>
            <th>Order Date</th>
            <th>Order Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const products = order.orderDetail;
            const productsArray = products.split(',');

            return (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{productsArray.map((product, index) => (
                  <React.Fragment key={index}>
                    {product}
                    <br />
                  </React.Fragment>
                ))}</td>
                <td>{order.orderDate}</td>
                <td>₹{order.orderAmount}</td>
                <td>{order.status}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <button onClick={() => { window.location.href = '/' }} type="button" class="btn btn-primary">Continue Shopping</button>
      <Footer />
    </div>
  );
};

export default Orders;



