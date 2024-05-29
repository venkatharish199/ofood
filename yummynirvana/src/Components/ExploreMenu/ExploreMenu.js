import axios from 'axios'
import React, { useState, useEffect } from 'react'
import './ExploreMenu.css'

const ExploreMenu = ({cat,setCategory}) => {
    const [categories, setCategories] = useState([
        {
        categoryId:0,
        categoryName:'',
        imageUrl:''
    }]
)

    useEffect(()=>{
        axios.get("https://localhost:7243/api/Categories").then((resp)=>{setCategories(resp.data)})
    })

  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>Unveil the secrets of our chef’s specials in the ‘Explore’ section. Each dish is a masterpiece, crafted to take your taste buds on an unforgettable journey. Delight in the discovery of new flavors and cherished classics, reimagined. Explore our menu and find your next favorite! 🍴✨</p>
        <div className='explore-menu-list'>
            {categories.map(category =>  (
                    <div onClick={()=>setCategory(prev=>prev===category.categoryId?0:category.categoryId)} key={category.categoryId} className='explore-menu-list-item'>
                        <img className={cat===category.categoryId?"active":""} src={category.imageUrl} alt='' />
                        <p>{category.categoryName}</p> 
                        </div>
                )
            )}

        </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
