import React, { useState } from 'react'
import './Home.css'
import Header from '../../Components/Header/Header'
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay'
import Footer from '../../Components/Footer/Footer'


const Home = ({ setShowLogin }) => {
  const [cat, setCategory] = useState(0);
  return (
    <div>
      <Header />
      <ExploreMenu cat={cat} setCategory={setCategory} />
      <FoodDisplay setShowLogin={setShowLogin} cat={cat} />
      <Footer />
    </div>
  )
}

export default Home
