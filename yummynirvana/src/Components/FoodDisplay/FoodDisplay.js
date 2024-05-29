import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FoodItem from '../FoodItem/FoodItem'
import './FoodDisplay.css'

const FoodDisplay = ({cat,setShowLogin}) => {
    const [products,setProducts] = useState([
        {
            productId:0,
            productName:'',
            productDescription:'',
            productPrice:0,
            imageUrl:'',
            categoryId:0
        }
    ])


    useEffect(()=>{
        axios.get("https://localhost:7243/api/Products").then((resp)=>{setProducts(resp.data)})

    })

  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <div className='food-display-list'>
            {products.map((product) => {
                
                if (cat===0 || cat===product.categoryId ) {
                    return <FoodItem setShowLogin={setShowLogin} key={product.productId} id={product.productId} name={product.productName} description={product.productDescription} price={product.productPrice} image={product.imageUrl} />
                }
            })}
            </div>     
    </div>
  )
}

export default FoodDisplay
