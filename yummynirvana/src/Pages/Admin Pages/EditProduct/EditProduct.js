import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [editData, setEditData] = useState({
    productPrice: '',
    productQuantity: ''
  });
  const token = sessionStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  useEffect(() => {
    // Fetch products using axios GET request
    axios.get('https://localhost:7243/api/Products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleProductChange = (event) => {
    const productId = event.target.value;
    const product = products.find(p => p.productId.toString() === productId);
    setSelectedProduct(product);
    setEditData({
      productPrice: product.productPrice,
      productQuantity: product.productQuantity
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Send the updated product data via PUT method
    axios.put(`https://localhost:7243/api/Products/${selectedProduct.productId}`, {
      ...selectedProduct,
      ...editData
    }, config)
      .then(response => {
        alert('Product updated:', response.data);
      })
      .catch(error => {
        alert('Error updating product:', error);
      });
  };

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios.delete(`https://localhost:7243/api/Products/${selectedProduct.productId}`, config)
        .then(response => {
          alert('Product deleted successfully');
          // Optionally, update the products state to remove the deleted product
          setProducts(products.filter(product => product.productId !== selectedProduct.productId));
          // Reset selectedProduct and editData
          setSelectedProduct({});
          setEditData({
            productPrice: '',
            productQuantity: ''
          });
        })
        .catch(error => {
          alert('Error deleting product:', error);
        });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Product</h2>
      <div className="form-group">
        <label htmlFor="productName">Product Name:</label>
        <select
          id="productName"
          className="form-control"
          value={selectedProduct.productId || ''}
          onChange={handleProductChange}
        >
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.productId} value={product.productId}>
              {product.productName}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="productPrice">Price:</label>
        <input
          type="number"
          id="productPrice"
          className="form-control"
          name="productPrice"
          value={editData.productPrice}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="productQuantity">Quantity:</label>
        <input
          type="number"
          id="productQuantity"
          className="form-control"
          name="productQuantity"
          value={editData.productQuantity}
          onChange={handleInputChange}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
      <button className="btn btn-danger ml-2" onClick={handleRemove}>Remove Product</button>
    </div>
  );
};

export default EditProduct;
  