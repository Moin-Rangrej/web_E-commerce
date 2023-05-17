import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import { Route, Routes } from 'react-router-dom';
import Product from './components/Product';
import Productmodal from './components/Productmodal';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<Product />} />
        {/* <Route path='/products/:id' element={<Productmodal />} /> */}
      </Routes>
      {/* <Productmodal /> */}
    </div>
  );
}

export default App;
