import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import Footer from '../../../Components/Footer/Footer'

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      "cartId": 0,
      "quantity": 0,
      "productId": 0,
      "price": 0
    }
  ]);
  const token = sessionStorage.getItem('token');
  //console.log(token);
  const config = {
    headers: {
      'Authorization': `Bearer ${token}` // Set the token in the Authorization header
    }
  };
  const [productNames, setProductNames] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const userId = sessionStorage.getItem("userId")

  useEffect(() => {
    // Fetch cart items for the given userId
    const fetchCartItems = async () => {
      try {

        const response = await axios.get(`https://localhost:7243/api/Carts/GetCartsByUser?userId=${userId}`, config);
        setCartItems(response.data);

        console.log(response.data);
        setIsLoading(false);


        const names = {};
        for (const item of response.data) {

          const productResponse = await axios.get(`https://localhost:7243/api/Products/GetProduct?id=${item.productId}`);
          names[item.productId] = productResponse.data.productName;
        }
        setProductNames(names);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [userId]);

  const removeFromCart = (cartId) => {
    axios.delete(`https://localhost:7243/api/Carts/${cartId}`, config).then((resp) => {
      setCartItems(currentItems => currentItems.filter(item => item.cartId !== cartId));
    })
      .catch(error => {
        console.error('Error removing cart item:', error);

      });


  };



  const increaseQuantity = async (cartId) => {
    // Find the cart item
    const cartItem = cartItems.find(item => item.cartId === cartId);
    if (cartItem) {

      try {
        // Make an API call to update the quantity in the backend
        await axios.post(`https://localhost:7243/api/Carts`, {
          userId: userId,
          quantity: 1,
          productId: cartItem.productId
        }, config);

        const updatedCartResponse = await axios.get(`https://localhost:7243/api/Carts/GetCartsByUser?userId=${userId}`, config);
        setCartItems(updatedCartResponse.data);
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    }
  };


  const decreaseQuantity = async (cartId) => {
    // Implement quantity decrease logic
    const cartItem = cartItems.find(item => item.cartId === cartId);
    if (cartItem) {
      if (cartItem.quantity === 1) {
        removeFromCart(cartId);
      }
      else {
        try {
          // Make an API call to update the quantity in the backend
          await axios.post(`https://localhost:7243/api/Carts`, {
            userId: userId,
            quantity: -1,
            productId: cartItem.productId
          }, config);

          const updatedCartResponse = await axios.get(`https://localhost:7243/api/Carts/GetCartsByUser?userId=${userId}`, config);
          setCartItems(updatedCartResponse.data);

        } catch (error) {
          console.error('Error updating quantity:', error);
        }
      }
    }
  };



  const handleCheckout = async () => {
    try {
      // Proceed with the checkout process
      const response = await axios.post(`https://localhost:7243/api/Orders/PlaceOrder?userId=${userId}`, {}, config);
      console.log('Checkout successful:', response.data);

      // Retrieve the order ID from the response
      // const orderId = response.data.orderId;

      // Navigate to a confirmation page
      window.location.href = '/order';
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };




  return (
    <div className="container mt-4">
      <h2>Shopping Cart</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <p>No items in the cart. Add some items!</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>S.no</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item.productId}>
                <td>{index + 1}</td>
                <td>{productNames[item.productId]}</td>
                <td>{item.price / item.quantity}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => decreaseQuantity(item.cartId)}
                  >
                    -
                  </button>{' '}
                  {item.quantity}{' '}
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => increaseQuantity(item.cartId)}
                  >
                    +
                  </button>
                </td>
                <td>{item.price}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeFromCart(item.cartId)}
                  >
                    Remove
                  </button>
                </td>
              </tr>

            ))}
          </tbody>
        </table>



      )}
      <>
        <button
          className="btn btn-success my-3"
          onClick={handleCheckout}
        >
          Go to Checkout
        </button>
      </>
      <Footer />
    </div>

  );
};

export default Cart;

