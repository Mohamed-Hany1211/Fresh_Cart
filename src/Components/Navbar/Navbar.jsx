import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import style from '../Navbar/Navbar.module.css';
import { userContext } from './Context/userContext';
import { useContext } from 'react';
import '../../Assets/Style/style.css';
import { counterContext } from './CounterContext/CounterContext';

export default function Navbar() {
    let {UserToken,setUserToken} = useContext(userContext);
    let {numItems} = useContext(counterContext);
    let navigate = useNavigate();
    function logOut(){
        localStorage.removeItem('userToken');
        setUserToken(null);
        navigate('/login');
    }
    return (
        <>
                <nav className={`navbar navbar-expand-lg bg-body-tertiary fixed-top ${style.padding} `}>
                    <div className="container ">
                        <Link className="navbar-brand d-flex align-items-center" to={'/'}><i className={`fa-solid fa-cart-shopping fs-2 mb-2  ${style.cartColor}`}></i><p className={`${style.logoFont}`}>FreshCart</p></Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className={`${style.marginLeft} collapse navbar-collapse`} id="navbarSupportedContent">
                            <ul className={`navbar-nav m-auto mb-2 mb-lg-0`}>

                                {UserToken?<> <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to={'/home'} style={({isActive})=>{
                                        return{
                                            borderBottom: isActive?'#0aad0a 2px solid':'none',
                                        }
                                    }} >Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to={'/cart'} style={({isActive})=>{
                                        return{
                                            borderBottom: isActive?'#0aad0a 2px solid':'none',
                                        }
                                    }}>Cart</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to={'wishList'} style={({isActive})=>{
                                        return{
                                            borderBottom: isActive?'#0aad0a 2px solid':'none',
                                        }
                                    }}>Wish List</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to={'/products'} style={({isActive})=>{
                                        return{
                                            borderBottom: isActive?'#0aad0a 2px solid':'none',
                                        }
                                    }}>Products</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to={'/categories'} style={({isActive})=>{
                                        return{
                                            borderBottom: isActive?'#0aad0a 2px solid':'none',
                                        }
                                    }}>Categories</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to={'/brands'} style={({isActive})=>{
                                        return{
                                            borderBottom: isActive?'#0aad0a 2px solid':'none',
                                        }
                                    }}>Brands</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to={'/cart'} >


                                        <div className={`${style.counterCartContainer}`}>
                                        <i className={`${style.cartFontSize} fa-solid fa-cart-shopping`}></i>
                                        <span className={`d-flex align-items-center justify-content-center bg-Main text-white ${style.counter} rounded-1`}>{numItems}</span>
                                        </div>
                                        
                                        
                                        </NavLink>
                                </li></>:''}
                            </ul>
                        </div>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex justify-content-center align-items-center">
                                <div>
                                    <i className="fa-brands fa-instagram mx-2 cursor-pointer" />
                                    <i className="fa-brands fa-facebook mx-2 cursor-pointer" />
                                    <i className="fa-brands fa-tiktok mx-2 cursor-pointer" />
                                    <i className="fa-brands fa-twitter mx-2 cursor-pointer" />
                                    <i className="fa-brands fa-linkedin mx-2 cursor-pointer" />
                                    <i className="fa-brands fa-youtube mx-2 cursor-pointer" />
                                </div>
                                    {UserToken? <li className="nav-item">
                                    <span onClick={()=>{
                                        logOut();
                                    }} className="nav-span active cursor-pointer" aria-current="page" >Logout</span>
                                </li>:<> <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to={'/register'}>Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to={'/login'}>Login</Link>
                                </li></>}
                            </ul>
                        </div>
                    </div>
                </nav>
        </>
    )
}
