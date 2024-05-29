import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const token = sessionStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    axios.get('https://localhost:7243/api/Categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        alert('Error fetching categories:', error);
      });
  }, []);

  const handleAddCategory = () => {
    if (!newCategoryName || !newImageUrl) {
      alert('Please fill in both Category Name and Image URL.');
      return;
    }

    const newCategory = {
      categoryName: newCategoryName,
      imageUrl: newImageUrl,
    };

    axios.post('https://localhost:7243/api/Categories/addCategory', newCategory, config)
      .then((response) => {
        setCategories([...categories, response.data]);
        setNewCategoryName('');
        setNewImageUrl('');
        alert(response.data);
      })
      .catch((error) => {
        alert('Error adding category:', error);
      });
  };

  const handleRemoveCategory = () => {
    if (!selectedCategoryId) {
      alert('Please select a category to remove.');
      return;
    }

    axios.delete(`https://localhost:7243/api/Categories/${selectedCategoryId}`, config)
      .then((resp) => {
        setCategories(categories.filter((cat) => cat.id !== selectedCategoryId));
        setSelectedCategoryId(0);
        alert(resp.data)
      })
      .catch((error) => {
        alert('Error removing category:', error);
      });
  };

  return (
    <div className="container">
      <h2>Manage Categories</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Category Name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image URL"
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleAddCategory}>Add Category</button>
      </div>
      <div className="mb-3">
        <select
          className="form-select"
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
        >
          <option value="">Select a category to remove</option>
          {categories.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.categoryName}
            </option>
          ))}
        </select>
        <button className="btn btn-danger mt-2" onClick={handleRemoveCategory}>Remove</button>
      </div>
    </div>
  );
};

export default ManageCategories;
