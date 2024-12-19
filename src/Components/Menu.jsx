import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Menu = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
  });
  const [editingItem, setEditingItem] = useState(null);
  const userRole = localStorage.getItem('role');

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/menu/menu/restaurant/${restaurantId}`);
      setMenuItems(response.data.menuItems);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleAddMenuItem = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/menu/menu', {
        ...newMenuItem,
        restaurantId,
      });
      setMenuItems((prev) => [...prev, response.data.newMenuItem]);
      setNewMenuItem({ name: '', description: '', price: '', image: '', category: '' });
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  const handleEditMenuItem = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/menu/menu/${id}`, editingItem);
      setMenuItems((prev) =>
        prev.map((item) => (item._id === id ? response.data.menuItem : item))
      );
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };

  const handleDeleteMenuItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/menu/menu/${id}`);
      setMenuItems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const handleAddToCart = (item) => {
    const quantity = 1;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ ...item, quantity });
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  useEffect(() => {
    fetchMenuItems();
  }, [restaurantId]);

  return (
    <div>
      <h1>Menu for Restaurant ID: {restaurantId}</h1>
      {userRole === 'admin' && (
        <div>
          <h2>Add New Menu Item</h2>
          <input
            type="text"
            placeholder="Name"
            value={newMenuItem.name}
            onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newMenuItem.description}
            onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={newMenuItem.price}
            onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newMenuItem.image}
            onChange={(e) => setNewMenuItem({ ...newMenuItem, image: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            value={newMenuItem.category}
            onChange={(e) => setNewMenuItem({ ...newMenuItem, category: e.target.value })}
          />
          <button onClick={handleAddMenuItem}>Add Menu Item</button>
        </div>
      )}

      <h2>Menu Items</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item._id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <p>Category: {item.category}</p>
            {item.image && <img src={item.image} alt={item.name} width="100" />}
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>

            {userRole === 'admin' && (
              <>
                <button onClick={() => setEditingItem(item)}>Edit</button>
                <button onClick={() => handleDeleteMenuItem(item._id)}>Delete</button>
              </>
            )}
            {editingItem?._id === item._id && (
              <div>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                />
                <input
                  type="text"
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                />
                <input
                  type="number"
                  value={editingItem.price}
                  onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                />
                <input
                  type="text"
                  value={editingItem.image}
                  onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                />
                <input
                  type="text"
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                />
                <button onClick={() => handleEditMenuItem(item._id)}>Save</button>
                <button onClick={() => setEditingItem(null)}>Cancel</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
