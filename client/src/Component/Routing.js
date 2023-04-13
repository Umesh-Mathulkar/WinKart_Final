import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Footer from "./Footer";
import Home from "./Home/Home";
import Products from "./Products/Products";
import Main from "./Main";
import AllProducts from "./Products/AllProducts";
import Details from "./ProDetails/Details";
import Orders from "./Orders/Orders";

import Register from "./login/register";
import Login from "./login/login";
import Booking from "./Orders/Booking";
import Search from "./Search"



const Routing = () => {
    return (
       
      
            <BrowserRouter>

                <Routes>

                    <Route path="/" element={<Main />}>
                        <Route index element={<Home />} />
                        <Route path="products/:subCatId" element={<Products />} />
                        <Route path="allProd/:catId" element={<AllProducts />} />
                        <Route path="details/:prodId" element={<Details />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="login" element={<Login/>}/>
                        <Route path="register" element={<Register/>}/>
                        <Route path="viewBooking" element={<Booking/>}/>    
                        <Route path="search" element={<Search/>}/>     
                    </Route>
                </Routes>
                <Footer />
            </BrowserRouter>
      
       
    )
}

export default Routing;