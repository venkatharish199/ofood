import React, { useState } from 'react'
import "./NavBar.css"
import { NavbarAssets } from '../../Assets/NavBar/NavbarAssets'
import { Link, useNavigate } from 'react-router-dom';



const NavBar = ({ setShowLogin }) => {


  const [menu, setMenu] = useState("menu");
  const navigate = useNavigate();
  const logOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("role");
    navigate('/')
    alert('You are Logged out')
  }

  const goToOrders = () => {
    window.location.href = '/order';
  }
  return (
    <div className='navbar'>
      <Link to='/' > <img src={NavbarAssets.logo} alt='' className='logo' /> </Link>
      {sessionStorage.getItem("role") === "User" || !sessionStorage.getItem("role")
        ? <>
          <ul className='navbar-menu'>
            <Link to={'/'} onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
            <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
            <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
          </ul>
        </>
        :
        <ul className='navbar-menu'>
          <Link to={'/admin/manageorders'} onClick={() => setMenu("manageorders")} className={menu === "manageorders" ? "active" : ""}>Manage Orders</Link>
          <Link to={'/admin/managecategories'} onClick={() => setMenu("managecategories")} className={menu === "managecategories" ? "active" : ""}>Manage Categories</Link>
          <Link to={'/admin/addproduct'} onClick={() => setMenu("add product")} className={menu === "add product" ? "active" : ""}>Add Product</Link>
          <Link to={'/admin/editproduct'} onClick={() => setMenu("edit product")} className={menu === "edit product" ? "active" : ""}>Edit Product</Link>
        </ul>
      }

      <div className='navbar-right'>
        {sessionStorage.getItem("role") === "User" || !sessionStorage.getItem("role")
          ? <>{sessionStorage.getItem("role") === "User"
            ? <Link to='/cart' ><img src={NavbarAssets.basket_icon} alt='' /> </Link>
            : <>
              <img onClick={() => setShowLogin(true)} src={NavbarAssets.basket_icon} alt='' />
            </>
          }
          </>
          : <>
          </>
        }
        {!sessionStorage.getItem("token")
          ? <button onClick={() => setShowLogin(true)}>Sign In</button>
          : <div className='navbar-profile'>
            <img src={NavbarAssets.profile_icon} alt='' />
            <ul className='navbar-profile-dropdown'>
              {sessionStorage.getItem("role") === "User"
                ? <>
                  <li onClick={goToOrders}><img src={NavbarAssets.bag_icon} alt='' /><p>Orders</p></li>
                  <hr />
                  <li onClick={logOut} ><img src={NavbarAssets.logout_icon} /><p>Logout</p></li>
                </>
                : <li onClick={logOut} ><img src={NavbarAssets.logout_icon} /><p>Logout</p></li>

              }

            </ul>

          </div>

        }

      </div>
    </div>

  );
}

export default NavBar
