import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './Layout/Header/Header';
import Home from './Pages/Home/Home';
import ProductDetail from './Pages/Products/ProductDetail.jsx';
import Footer from './Layout/Footer/Footer';
import Shop from './Pages/Shop/Shop';
import Admin from './Pages/Admin/Admin';
import Register from './Pages/Login/Register';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/:info" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:info" element={<Profile />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
