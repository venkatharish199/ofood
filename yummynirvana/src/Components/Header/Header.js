import React from 'react'
import './Header.css'
const Header = () => {
  return (
    <div className='header'>
      <div className='header-contents'>
        <h2>Order your favourite food here</h2>
        {/* <p>Choose from a diverse menu delectable array of dishes crafted with the finest ingredients and culnery expertise. Our mission is satisfy your cravings.</p> */}
        <a href='#explore-menu'> <button>View Menu</button>  </a>
      </div>
    </div>
  )
}

export default Header
