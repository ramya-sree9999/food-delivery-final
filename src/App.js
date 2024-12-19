// src/App.js
// src/App.js
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import RestaurantList from './Components/RestaurantList';
// import Menu from './Components/Menu';
// import Cart from './Components/Cart';
// import Checkout from './Components/Checkout';
// import Login from './Components/Login';
// import Register from './Components/Register';
// import './App.css';


// function App() {
//   const [cart, setCart] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [user, setUser] = useState(null); // State for authenticated user
//   const [registeredUser, setRegisteredUser] = useState(null); // State for registered user

//   const addItemToCart = (item) => {
//     setCart((prevCart) => {
//       const itemExists = prevCart.find(cartItem => cartItem.id === item.id);
//       if (itemExists) {
//         return prevCart.map(cartItem =>
//           cartItem.id === item.id
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         );
//       } else {
//         return [...prevCart, { ...item, quantity: 1 }];
//       }
//     });
//   };

//   const removeItemFromCart = (item) => {
//     setCart((prevCart) => prevCart.filter(cartItem => cartItem.id !== item.id));
//   };

//   // Function to clear the cart
//   const onClearCart = () => {
//     setCart([]);
//   };

//   useEffect(() => {
//     const newTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     setTotal(newTotal);
//   }, [cart]);

//   const handleLogin = (userData) => {
//     setUser(userData); // Update the user state on successful login
//   };

//   const handleLogout = () => {
//     setUser(null); // Clear the user state on logout
//     setCart([]); // Clear the cart on logout
//   };

//   const handleRegister = (userData) => {
//     setRegisteredUser(userData); // Store the registered user data
//     alert('Registration successful!');
//   };

//   return (
//     <Router>
//       <nav>
//         <Link to="/">Home</Link> | 
//         <Link to="/restaurantList">Restaurant List</Link> | 
//         <Link to="/cart">Cart</Link> | 
//         <Link to="/checkout">Checkout</Link> | 
//         {user ? (
//           <>
//             <span>Welcome, {user.name}</span> | <button onClick={handleLogout}>Logout</button>
//           </>
//         ) : (
//           <>
//             <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
//           </>
//         )}
//       </nav>

//       <Routes>
//         <Route path="/" element={<h1>Welcome to Swiggy</h1>} />
//         <Route path="/restaurantList" element={<RestaurantList />} />
//         <Route path="/menu/:restaurantId" element={<Menu addItemToCart={addItemToCart} />} />
//         <Route path="/cart" element={<Cart cart={cart} total={total} onRemoveItem={removeItemFromCart} />} />
//         <Route path="/checkout" element={<Checkout cart={cart} total={total} onClearCart={onClearCart} />} />
//         <Route path="/login" element={<Login registeredUser={registeredUser} onLogin={handleLogin} />} />
//         <Route path="/register" element={<Register onRegister={handleRegister} />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RestaurantList from './Components/RestaurantList';
import Menu from './Components/Menu';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import Login from './Components/Login';
import Register from './Components/Register';
import './App.css';

function App() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [user, setUser] = useState(null); // State for authenticated user
    const [registeredUser, setRegisteredUser] = useState(null); // State for registered user

    const addItemToCart = (item) => {
        setCart((prevCart) => {
            const itemExists = prevCart.find(cartItem => cartItem.id === item.id);
            if (itemExists) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    const removeItemFromCart = (item) => {
        setCart((prevCart) => prevCart.filter(cartItem => cartItem.id !== item.id));
    };

  // Function to clear the cart
    const onClearCart = () => {
        setCart([]);
    };

    useEffect(() => {
        const newTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(newTotal);
    }, [cart]);

    const handleLogin = (userData) => {
        setUser(userData); // Update the user state on successful login
    };

    const handleLogout = () => {
        setUser(null); // Clear the user state on logout
        setCart([]); // Clear the cart on logout
    };

    const handleRegister = (userData) => {
        setRegisteredUser(userData); // Store the registered user data
        alert('Registration successful!');
    };

    return (
        <Router>
            <nav>
                <Link to="/">Home</Link> | 
                <Link to="/restaurantList">Restaurant List</Link> | 
                <Link to="/menu">Menu</Link> |
                <Link to="/cart">Cart</Link> | 
                <Link to="/checkout">Checkout</Link> | 
                {user ? (
                    <>
                        <span>Welcome, {user.name}</span> | <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
                    </>
                )}
            </nav>

            <Routes>
                <Route path="/" element={<h1>Welcome to Swiggy</h1>} />
                <Route path="/restaurantList" element={<RestaurantList />} />
                <Route path="/menu/:restaurantId" element={<Menu addItemToCart={addItemToCart} />} />
                <Route path="/cart" element={<Cart cart={cart} total={total} onRemoveItem={removeItemFromCart} />} />
                <Route path="/checkout" element={<Checkout cart={cart} total={total} onClearCart={onClearCart} />} />
                <Route path="/login" element={<Login registeredUser={registeredUser} onLogin={handleLogin} />} />
                <Route path="/register" element={<Register onRegister={handleRegister} />} />
            </Routes>
        </Router>
    );
}

export default App; 

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import RestaurantList from './Components/RestaurantList';
// import Menu from './Components/Menu';
// import Cart from './Components/Cart';
// import Checkout from './Components/Checkout';
// import Login from './Components/Login';
// import Register from './Components/Register';
// import './App.css';

// function App() {
//     const [cart, setCart] = useState([]);
//     const [total, setTotal] = useState(0);
//     const [user, setUser] = useState(null); // State for authenticated user
//     const [registeredUser, setRegisteredUser] = useState(null); // State for registered user

//     const addItemToCart = (item) => {
//         setCart((prevCart) => {
//             const itemExists = prevCart.find(cartItem => cartItem.id === item.id);
//             if (itemExists) {
//                 return prevCart.map(cartItem =>
//                     cartItem.id === item.id
//                         ? { ...cartItem, quantity: cartItem.quantity + 1 }
//                         : cartItem
//                 );
//             } else {
//                 return [...prevCart, { ...item, quantity: 1 }];
//             }
//         });
//     };

//     const removeItemFromCart = (item) => {
//         setCart((prevCart) => prevCart.filter(cartItem => cartItem.id !== item.id));
//     };

//     // Function to clear the cart
//     const onClearCart = () => {
//         setCart([]);
//     };

//     useEffect(() => {
//         const newTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
//         setTotal(newTotal);
//     }, [cart]);

//     const handleLogin = (userData) => {
//         setUser(userData); // Update the user state on successful login
//     };

//     const handleLogout = () => {
//         setUser(null); // Clear the user state on logout
//         setCart([]); // Clear the cart on logout
//     };

//     const handleRegister = async (userData) => {
//         try {
//             const response = await fetch('/api/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(userData),
//             });

//             if (response.ok) {
//                 const result = await response.json();
//                 setRegisteredUser(result);
//                 alert('Registration successful! You can now log in.');
//             } else {
//                 const errorData = await response.json();
//                 alert(`Registration failed: ${errorData.message || 'Please try again.'}`);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             alert('An error occurred while registering');
//         }
//     };

//     return (
//         <Router>
//             <nav>
//                 <Link to="/">Home</Link> | 
//                 <Link to="/restaurantList">Restaurant List</Link> | 
//                 <Link to="/cart">Cart</Link> | 
//                 <Link to="/checkout">Checkout</Link> | 
//                 {user ? (
//                     <>
//                         <span>Welcome, {user.name}</span> | <button onClick={handleLogout}>Logout</button>
//                     </>
//                 ) : (
//                     <>
//                         <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
//                     </>
//                 )}
//             </nav>

//             <Routes>
//                 <Route path="/" element={<h1>Welcome to Swiggy</h1>} />
//                 <Route path="/restaurantList" element={<RestaurantList />} />
//                 <Route path="/menu/:restaurantId" element={<Menu addItemToCart={addItemToCart} />} />
//                 <Route path="/cart" element={<Cart cart={cart} total={total} onRemoveItem={removeItemFromCart} />} />
//                 <Route path="/checkout" element={<Checkout cart={cart} total={total} onClearCart={onClearCart} />} />
//                 <Route path="/login" element={<Login onLogin={handleLogin} />} />
//                 <Route path="/register" element={<Register onRegister={handleRegister} />} />
//             </Routes>
//         </Router>
//     );
// }

// export default App;
