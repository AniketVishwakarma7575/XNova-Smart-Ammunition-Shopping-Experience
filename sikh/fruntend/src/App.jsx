import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Product from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import ProtectedRoute from './components/ProtectedRoute';
import Error from './pages/ErrorPage'
import AdminDashboard from './pages/AdminDashboard';
import AddProduct from './pages/AddProduct';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const tokenUser = localStorage.getItem('user');
    if (tokenUser) setUser(JSON.parse(tokenUser));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} setUser={setUser} />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/product/:id" element={<Product />} /> */}
          <Route path="/product/:id" element={<ProductDetail />} />

          <Route path="/cart" element={
            <ProtectedRoute user={user}>
              <Cart />
            </ProtectedRoute>
          } />
          {/* <Route path="/admin" element={
            <ProtectedRoute user={user}>
              <AdminDashboard />
            </ProtectedRoute>
          } /> */}

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add" element={<AddProduct />} />
          <Route path="/admin/products" element={<ProductList />} />

          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
