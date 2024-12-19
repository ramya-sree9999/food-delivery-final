import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [form, setForm] = useState({ _id: "", name: "", image: "", description: "", rating: "" });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState(""); // Form validation error state
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  // Fetch all restaurants
  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/restaurants/");
      setRestaurants(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch restaurants");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFormError(""); // Reset form error when user starts typing
  };

  // Validate the form
  const validateForm = () => {
    if (!form.name || !form.image || !form.description || !form.rating) {
      setFormError("All fields are required.");
      return false;
    }
    if (form.rating < 1 || form.rating > 5) {
      setFormError("Rating must be between 1 and 5.");
      return false;
    }
    return true;
  };

  // Add a new restaurant
  const handleAddRestaurant = async () => {
    if (!validateForm()) return; // Only proceed if the form is valid
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/restaurants/", form);
      fetchRestaurants();
      setForm({ _id: "", name: "", image: "", description: "", rating: "" });
      setLoading(false);
    } catch (err) {
      setError("Failed to add restaurant");
      setLoading(false);
    }
  };

  // Set the form data for editing
  const handleEditRestaurant = (restaurant) => {
    setEditMode(true);
    setForm(restaurant);
  };

  // Update an existing restaurant
  const handleUpdateRestaurant = async () => {
    if (!validateForm()) return; // Only proceed if the form is valid
    try {
      setLoading(true);
      const { _id } = form;
      await axios.put(`http://localhost:5000/api/restaurants/${_id}`, form);
      fetchRestaurants();
      setForm({ _id: "", name: "", image: "", description: "", rating: "" });
      setEditMode(false);
      setLoading(false);
    } catch (err) {
      setError("Failed to update restaurant");
      setLoading(false);
    }
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditMode(false);
    setForm({ _id: "", name: "", image: "", description: "", rating: "" });
  };

  // Delete a restaurant
  const handleDeleteRestaurant = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/api/restaurants/${id}`);
      fetchRestaurants();
      setLoading(false);
    } catch (err) {
      setError("Failed to delete restaurant");
      setLoading(false);
    }
  };

  // View Menu (Navigate to the menu page)
  const handleViewMenu = (id) => {
    // Navigate to the menu page for the restaurant
    navigate(`/menu/${id}`); // Use navigate to go to the menu page
  };

  // Get user role from localStorage
  const userRole = localStorage.getItem("role");

  return (
    <div className="restaurant-management">
      <h1>Restaurant Management</h1>

      {/* Show Add Restaurant form only if user is admin */}
      {userRole === "admin" && (
        <div className="restaurant-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating (1-5)"
            value={form.rating}
            onChange={handleInputChange}
          />
          {formError && <p className="form-error">{formError}</p>} {/* Display form error */}
          {editMode ? (
            <>
              <button onClick={handleUpdateRestaurant} disabled={loading}>Update Restaurant</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </>
          ) : (
            <button onClick={handleAddRestaurant} disabled={loading}>Add Restaurant</button>
          )}
        </div>
      )}

      {/* Display loading or error messages */}
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {/* Restaurant list */}
      <div className="restaurant-container">
        {restaurants.map((restaurant) => (
          <div key={restaurant._id} className="restaurant-card">
            <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
            <div className="restaurant-info">
              <h2>{restaurant.name}</h2>
              <p>{restaurant.description}</p>
              <p>Rating: {restaurant.rating}</p>
              {userRole === "admin" && (
                <>
                  <button onClick={() => handleEditRestaurant(restaurant)} disabled={loading}>Edit</button>
                  <button onClick={() => handleDeleteRestaurant(restaurant._id)} disabled={loading}>Delete</button>
                </>
              )}
              <button onClick={() => handleViewMenu(restaurant._id)} disabled={loading}>View Menu</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurant;
