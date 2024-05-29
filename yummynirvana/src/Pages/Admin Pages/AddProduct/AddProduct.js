import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    productName: '',
    productPrice: '',
    productQuantity: '',
    productDescription: '',
    imageUrl: '',
    categoryId: '' // Updated field name
  });

  const token = sessionStorage.getItem('token');
  //console.log(token);
  const config = {
    headers: {
      'Authorization': `Bearer ${token}` // Set the token in the Authorization header
    }
  };

  useEffect(() => {
    // Fetch categories
    axios.get('https://localhost:7243/api/Categories').then(response => {
      setCategories(response.data);
    })
      .catch(error => {
        console.error('There was an error fetching the categories', error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Post form data
    axios.post('https://localhost:7243/api/Products', formData, config)
      .then(response => {
        alert('Product added successfully', response.data);
      })
      .catch(error => {
        alert('There was an error posting the product', error);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">Product Name</label>
          <input type="text" className="form-control" id="productName" name="productName" value={formData.productName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">Product Price</label>
          <input type="number" className="form-control" id="productPrice" name="productPrice" value={formData.productPrice} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="productQuantity" className="form-label">Product Quantity</label>
          <input type="number" className="form-control" id="productQuantity" name="productQuantity" value={formData.productQuantity} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="productDescription" className="form-label">Product Description</label>
          <textarea className="form-control" id="productDescription" name="productDescription" value={formData.productDescription} onChange={handleChange} required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">Product Image URL</label>
          <input type="text" className="form-control" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
        </div>


        <div className="mb-3">
          <label htmlFor="categoryId" className="form-label">Category</label>
          <select className="form-select" id="categoryId" name="categoryId" value={formData.categoryId} onChange={handleChange} required>
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
