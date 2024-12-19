// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './Components/Header';
// import Footer from './Components/Footer';
// // import Login from './Components/Login';
// // import Register from './Components/Register';
// import RestaurantList from './Components/RestaurantList';
// import Menu from './Components/Menu';
// import Cart from './Components/Cart';

// function App() {
//   const [cart, setCart] = useState([]);

//   // Function to add items to the cart
//   const addItemToCart = (item) => {
//     const existingItem = cart.find((cartItem) => cartItem.id === item.id);
//     if (existingItem) {
//       setCart(
//         cart.map((cartItem) =>
//           cartItem.id === item.id
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         )
//       );
//     } else {
//       setCart([...cart, { ...item, quantity: 1 }]);
//     }
//   };

//   // Function to calculate total price
//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   // Function to remove an item from the cart
//   const removeItemFromCart = (item) => {
//     setCart(cart.filter((cartItem) => cartItem.id !== item.id));
//   };

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           {/* Define the routes */}
//           <Route
//             path="/menu"
//             element={<Menu addItemToCart={addItemToCart} />}
//           />
//           <Route
//             path="/cart"
//             element={
//               <Cart
//                 cart={cart}
//                 total={total}
//                 onRemoveItem={removeItemFromCart}
//               />
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
