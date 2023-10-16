import './App.css';
import Brands from "./Components/Navbar/Brands/Brands";
import Cart from "./Components/Navbar/Cart/Cart";
import Categories from "./Components/Navbar/Categories/Categories";
import BrandsDetails from "./Components/Navbar/BrandsDetails/BrandsDetails";
import Home from "./Components/Navbar/Home/Home";
import Layout from "./Components/Navbar/Layout/Layout";
import Login from "./Components/Navbar/Login/Login";
import Register from "./Components/Navbar/Register/Register";
import NotFound from "./Components/Navbar/NotFound/NotFound";
import Products from "./Components/Navbar/Products/Products";
import {RouterProvider, createBrowserRouter, createHashRouter} from "react-router-dom";
import  { userContext } from './Components/Navbar/Context/userContext';
import { useContext, useEffect } from 'react';
import ProtectedRoute from './Components/Navbar/ProtectedRoute/ProtectedRoute';
import WishList from './Components/Navbar/WishList/WishList';
import ProductDetails from './Components/Navbar/ProductDetails/ProductDetails';
import CartContextProvider, { cartContext } from './Components/Navbar/CartContext/CartContext';
import { Toaster } from 'react-hot-toast';
import Adress from './Components/Navbar/Adress/Adress';
import ForgetPassword from './Components/Navbar/ForgetPassword/ForgetPassword';
import ConfirmationCode from './Components/Navbar/ConfirmationCode/ConfirmationCode';
import ResetPassword from './Components/Navbar/ResetPassword/ResetPassword';
import AllOrders from './Components/Navbar/AllOrders/AllOrders';
import WishListContextProvider from './Components/Navbar/WishListContext/WishListContext';
import CounterContextProvider from './Components/Navbar/CounterContext/CounterContext';




// import BrandsContextProvider from './Components/Navbar/BrandContext/BrandContext';
// import WishListContextProvider from './Components/Navbar/WishListContext/WishListContext';

// import { Carousel } from 'bootstrap';
// import Profile from './Components/Navbar/Profile/Profile';






let routers = createHashRouter([
  
  {path:'/' ,element:<Layout/>,children:[
    {index:true ,element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'wishList',element:<ProtectedRoute><WishList/></ProtectedRoute>},
    {path:'home' ,element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'allorders',element:<AllOrders/>},
    {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'brandsDetails/:id',element:<ProtectedRoute><BrandsDetails/></ProtectedRoute>},
    {path:'login',element:<Login/>},
    {path:'register',element:<Register/>},
    {path:'address',element:<ProtectedRoute><Adress/></ProtectedRoute>},
    {path:'products',element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'forgetPassword',element:<ForgetPassword/>},
    {path:'resetPass',element:<ResetPassword/>},
    {path:'confirmationCode',element:<ConfirmationCode/>},
    {path:'productDetails/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'*',element:<NotFound/>},
  ]}
]);

function App() {
  let { setUserToken } = useContext(userContext);

  useEffect(() => {
      if (localStorage.getItem('userToken')) {
          setUserToken(localStorage.getItem('userToken'));
      }
  }, []);

  return (
    <>
    <CounterContextProvider>
    <CartContextProvider>
      <WishListContextProvider>
      <RouterProvider router={routers}></RouterProvider>
      </WishListContextProvider>
    </CartContextProvider>
    </CounterContextProvider>
    <Toaster/>
    </>
  );
}

export default App;


