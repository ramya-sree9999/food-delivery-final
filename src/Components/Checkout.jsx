// src/components/Checkout.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Checkout() {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.cardNumber || formData.cardNumber.length !== 16 || !/^\d+$/.test(formData.cardNumber)) {
      newErrors.cardNumber = 'Card number must be 16 digits.';
    }
    if (!formData.cardHolder) {
      newErrors.cardHolder = 'Card holder name is required.';
    }
    if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Expiry date must be in MM/YY format.';
    }
    if (!formData.cvv || formData.cvv.length !== 3 || !/^\d+$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3 digits.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Order Placed');
      navigate('/');
    }
  };

  return (
    <div>
      <h2 className="checkout-heading">Checkout</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div>
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
          />
          {errors.cardNumber && <p className="error">Card number must be 16 digits.</p>}
        </div>
        <div>
          <label htmlFor="cardHolder">Card Holder Name:</label>
          <input
            type="text"
            id="cardHolder"
            name="cardHolder"
            value={formData.cardHolder}
            onChange={handleChange}
          />
          {errors.cardHolder && <p className="error">Card holder name is required.</p>}
        </div>
        <div>
          <label htmlFor="expiryDate">Expiry Date (MM/YY):</label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
          />
          {errors.expiryDate && <p className="error">Expiry date must be in MM/YY format.</p>}
        </div>
        <div>
          <label htmlFor="cvv">CVV:</label>
          <input
            type="password"
            id="cvv"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
          />
          {errors.cvv && <p className="error">CVV must be three characters.</p>}
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;
