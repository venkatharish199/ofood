import React, { useState, useEffect } from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom/dist'
import NavBar from './Components/NavBar/NavBar'
import Home from './Pages/Home/Home'
import Cart from './Pages/User Pages/Cart/Cart'
import LoginPopup from './Components/LoginPopup/LoginPopup'
import Orders from './Pages/User Pages/Orders/Orders'
import AddProduct from './Pages/Admin Pages/AddProduct/AddProduct'
import EditProduct from './Pages/Admin Pages/EditProduct/EditProduct'
import ManageOrders from './Pages/Admin Pages/ManageOrders/ManageOrders'
import ManageCategories from './Pages/Admin Pages/ManageCategories/ManageCategories'



const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  //const navigate = useNavigate();
  
  
  



  const isAdmin = () => {
    const role = sessionStorage.getItem('role');
    return role === 'Admin';
  };

  // useEffect(() => {
  //   if (window.location.pathname === '/admin' && !isAdmin()) {
  //     navigate('/'); // Redirect non-admin users to the home page
  //   }
  // }, [navigate]);

  return (
    <div>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className='app'>
        <NavBar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home setShowLogin={setShowLogin} />} />
          <Route path='/cart' element={isAdmin() ? <Navigate to='/admin/manageorders' /> : <Cart />} />
          <Route path='/order' element={isAdmin() ? <Navigate  to='/admin/manageorders'/> : <Orders />} />
          <Route path='/admin/manageorders' element={isAdmin() ? <ManageOrders /> : <Navigate to="/" />} />
          <Route path='/admin/addproduct' element={isAdmin() ? <AddProduct /> : <Navigate to="/" />} />
          <Route path='/admin/editproduct' element={isAdmin() ? <EditProduct /> : <Navigate to="/" />} />
          <Route path='/admin/managecategories' element={isAdmin() ? <ManageCategories /> : <Navigate to='/' />} />

        </Routes>
      </div>
    </div>
  )
}

export default App
