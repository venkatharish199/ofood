import React, { useState } from 'react'
import './FoodItem.css'
import { NavbarAssets } from '../../Assets/NavBar/NavbarAssets.js'
import axios from 'axios'

const FoodItem = ({ id, name, description, price, image }) => {
  const [cart, setCart] = useState({
    "userId": sessionStorage.getItem("userId"),
    "quantity": 0,
    "productId": id
  });

  const [itemCount, setItemCount] = useState(0);
  const token = sessionStorage.getItem('token');
  //console.log(token);
  const config = {
    headers: {
      'Authorization': `Bearer ${token}` // Set the token in the Authorization header
    }
  };



  const addToCart = () => {
    try {

      setCart({ ...cart, [cart.quantity]: cart.quantity++ })
      axios.post('https://localhost:7243/api/Carts', cart, config).then((resp) => alert(resp.data)).catch((error) => alert('Failed...Try Again'));
      setItemCount(cart.quantity);
    }
    catch (error) {
      alert('Try again');
    }


  }


  const goToCart = () => {
    window.location.href = '/cart';
  }



  return (
    <div className='food-item'>
      <div className='food-item-img-container'>
        <img className='food-item-img' src={image} alt='' />
        {sessionStorage.getItem('token')
          ? <>
            {!itemCount
              ? <img className='add' onClick={addToCart} src={NavbarAssets.add_icon_white} alt='' />
              : <img className='gotocart' onClick={goToCart} src={NavbarAssets.basket_icon} alt='' />
            }
          </>
          : <>
            <img className='add' onClick={() => alert("Please Login First and add to Cart")} src={NavbarAssets.add_icon_white} alt='' />
          </>
        }


      </div>
      <div className='food-item-info'>
        <div className='food-item-name'>
          <p>{name}</p>
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className='food-item-price'>₹{price}</p>
      </div>
    </div>
  )
}

export default FoodItem
