import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import { Offline, Online } from "react-detect-offline";
export default function Layout() {

    return (
        <>
            <Navbar />
            <Outlet></Outlet>



            <div>

                <Offline><div className='network'>
                    <i className='fas fa-wifi'></i> you are offline!
                </div>
                </Offline>
            </div>
            <Footer />
        </>
    )
}
