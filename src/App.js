import './App.scss';
import "@stripe/stripe-js"
import {BrowserRouter ,Routes,Route} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import CartPage from './pages/CartPage/CartPage';
import Navbar from "./Componants/Navbar/Navbar"
import Footer from './Componants/Footer/Footer'
import Store from './Componants/store/Store';
import { Provider } from 'react-redux';
import Checkout from './pages/Checkout/Checkout';
import Success from './pages/success/Success';
import Cancel from './pages/cancel/Cancel';



export default function App() {


  return (

  
    <div className="App">
       
      <Provider store={Store}>
      <BrowserRouter>
      <Navbar/>
      <Routes>

        <Route path='/' element= {<HomePage/>}/>
        <Route path='/category/:id' element={<CategoryPage/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/success' element={<Success/>}/>
        <Route path='/cancel' element={<Cancel/>}/>

      </Routes>
      <Footer/>
      </BrowserRouter>
      </Provider>
    </div>
  );

}


