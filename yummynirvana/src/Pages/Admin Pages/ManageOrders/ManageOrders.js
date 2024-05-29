import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form } from 'react-bootstrap';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState({});
  const token = sessionStorage.getItem('token');
  //console.log(token);
  const config = {
    headers: {
      'Authorization': `Bearer ${token}` // Set the token in the Authorization header
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://localhost:7243/api/Orders', config);
        const lastTwentyOrders = response.data.slice(-20);
        setOrders(lastTwentyOrders);

        // Fetch user details for these orders
        const userIds = [...new Set(lastTwentyOrders.map(order => order.userId))];
        const userResponses = await Promise.all(
          userIds.map(userId => axios.get(`https://localhost:7243/api/Users/${userId}`, config))
        );
        const usersData = userResponses.reduce((acc, res) => {
          acc[res.data.userId] = res.data;
          return acc;
        }, {});
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    // API call to update the status
    axios.put(`https://localhost:7243/api/Orders/${orderId}`, { status: newStatus }, config)
      .then(response => {
        // Update the state with the new status
        setOrders(orders.map(order => {
          if (order.orderId === orderId) {
            alert('status changed');
            return { ...order, Status: newStatus };
          }
          return order;
        }));
      })
      .catch(error => alert('Error updating status:', error));
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Order Detail</th>
          <th>Status</th>
          <th>Order Date</th>
          <th>Order Amount</th>
          <th>User Name</th>
          <th>Address</th>
          <th>Edit Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.orderId}>
            <td>{order.orderId}</td>
            <td>{order.orderDetail}</td>
            <td>{order.status}</td>
            <td>{order.orderDate}</td>
            <td>{order.orderAmount}</td>
            <td>{users[order.userId]?.name}</td>
            <td>{users[order.userId]?.address}</td>
            <td>
              <Form.Control
                as="select"
                value={order.Status}
                onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </Form.Control>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ManageOrders;
