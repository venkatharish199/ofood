import React from 'react'
import './LoginPopup.css'
import { NavbarAssets } from '../../Assets/NavBar/NavbarAssets'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");
  //const [token, setToken] = useState("");
  const [user, setUser] = useState({
    "userId": 0,
    "name": "",
    "password": "",
    "email": "",
    "address": "",
    "mobileNo": "",
    "postelCode": 0
  });


  //const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const navigate = useNavigate();



  const handleInput = (e) => {

    setUser({ ...user, [e.target.name]: e.target.value })

  }

  const handleSubmitt = (e) => {
    e.preventDefault()
    if (currState == "Log In") {
      axios.post('https://localhost:7243/api/Users/login', user).then((resp) => {
        let result = resp.data;
        console.log(resp.data);
        sessionStorage.setItem("token", result.jwt);
        sessionStorage.setItem("userId", result.userDetails.userId);
        sessionStorage.setItem("role", result.userDetails.role);

        //setIsLoggedIn(true);
        setShowLogin(false);
        if (sessionStorage.getItem("role") === "User") {
          navigate('/');
        }
        else {
          navigate('/admin/manageorders');
        }
        alert("You are succesfully logged in");
      }

      ).catch((error) => {
        setShowLogin(false)
        navigate('/');
        alert(error + ' Invalid credentials')
      });




    }
    else {

      axios.post('https://localhost:7243/api/Users/register', user).then((resp) => {
        alert(resp.data)
        setCurrState("Log In");
      }).catch((error) => {
        alert('user with email is alreaddy exists')
      });
    }



  }
  return (
    <div className='login-popup'>
      <form onSubmit={handleSubmitt} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={NavbarAssets.cross_icon} alt='' />
        </div>
        <div className='login-popup-inputs' >
          {currState === "Log In" ? <></> :
            <>
              <input type="text" name='name' onChange={handleInput} pattern='^[A-Za-z\s]{2,50}$' title='Name should only contain letters and spaces, and be 2-50 characters long.' placeholder='Enter Name' required />
              <input type="text" name='mobileNo' onChange={handleInput} pattern='^[6-9]\d{9}$' title='Enter a valid 10-digit Indian mobile number starting with 6-9.' placeholder='Mobile No' required />
              <input type="text" name='address' onChange={handleInput} pattern='^.{3,250}$'
                title='Address can include 3-250 characters long.' placeholder='Address' required />
              <input type="number" name='postelCode' onChange={handleInput} pattern='^[1-9][0-9]{5}$' title='Enter a valid 6-digit Indian postal code.' placeholder='Postel Code' required />
            </>
          }
          <input type="email" name='email' onChange={handleInput} pattern='^[^\s@]+@[^\s@]+\.[^\s@]+$' title='Enter a valid email address.' placeholder='Enter your Email' required />
          <input type="password" name='password' onChange={handleInput} pattern='^.{8,}$'
            title='Password must be at least 8 characters long.' placeholder='Create Password' required />
        </div>
        <button type='submit' > {currState === "Sign Up" ? "Create Account" : "Log In"}</button>
        <div>
          <div className='login-popup-condition'>
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & policy.</p>
          </div>
          {currState === "Log In" ?
            <p>Create a new account?<span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
            : <p>Already have an account?<span onClick={() => setCurrState("Log In")}>Login here</span></p>
          }
        </div>


      </form>
    </div>
  )
}

export default LoginPopup
