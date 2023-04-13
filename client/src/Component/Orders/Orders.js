import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import './Orders.css'
import Nav from "../Nav";

//urls
// const cartUrl = "http://localhost:4600/api/auth/cartUser/"
// const deleteCarturl = "http://localhost:4600/api/auth/deleteCart/"
const cartUrl = "https://winkart-cart.onrender.com/api/auth/cartUser/";
const subCatUrl = "https://winkart.onrender.com/product/";
const deleteCarturl = "https://winkart-cart.onrender.com/api/auth/deleteCart/";
const OrderUrl = "http://winkart.onrender.com/placeOrder";
//urls end


const Orders = () => {
    //states
    const [prod, setProd] = useState([]);
    const [cartD, setcartD] = useState();
    const [total, setTotal] = useState();
    const [user, setUser] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const id = Math.floor(Math.random() * 10000);
    const navigate = useNavigate();
    //states end


    //getting details of cart
    const reId = () => {
        if (sessionStorage.getItem('userInfo')) {
            let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            setUser(userInfo.name);
            setEmail(userInfo.email);
            setPhone(userInfo.phone);
            let finalCartUrl = `${cartUrl}${userInfo['email']}`
            fetch(finalCartUrl, { method: 'GET' })
                .then((res) => res.json())
                .then((data) => {
                    setcartD(data)
                })
        }
    }



    //showing details 
    const reCart = () => {
        if (cartD) {
            let tempProd = [];
            cartD.forEach((item, index) => {
                axios.get(`${subCatUrl}${item.orderId}`)
                    .then(response => {
                        const data = response.data;
                        tempProd[index] = data;
                        if (tempProd.filter(Boolean).length === cartD.length) {
                            tempProd.sort((a, b) => cartD.findIndex(item => item.orderId === a[0].product_id) - cartD.findIndex(item => item.orderId === b[0].product_id));
                            setProd(tempProd);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
        }
        else {
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        }
    };

    //fetch on mount
    useEffect(() => {
        reId();
        reCart();
        totalAmount();
    }, [cartD]);



    //delete items
    const handleDelete = (id) => {
       
        axios.delete(`${deleteCarturl}${id}`)
            .then(() => {
                alert("removed successfully");
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            });
        
    }
    //delete items ends

    //total amount
    const totalAmount = () => {
        setTotal(prod.reduce((acc, curr) => acc + curr[0].Price, 0))

    }
    //total amount ends









    const renderCart = () => {
        return prod.map((item, index) => {

            return (
                <><div className="col-lg-4 col-md-6 d-flex justify-content-center" key={index}>
                    <div className="card mt-2 mb-2 cartCard" style={{ width: '15rem' }}>
                        <div className="cartImg">
                            <img src={item[0].image} className="card-img-top" />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{item[0].product_name}</h5>

                            <p style={{ color: 'red', display: 'inline-block' }} className="card-text">Rs.{item[0].Price.toLocaleString()} </p>&nbsp;

                            <button onClick={() => handleDelete(item[0].product_id)} className="btn btn-danger">Remove</button>
                        </div>
                    </div>
                </div>

                </>
            )
        })

    }

    const checkout = () => {
        

        const paymentDetails = {
            orderID: id,
            price: total,
            customerId: user,
            customerEmail: email,
            customerPhone: phone
        };
        
        axios.post(OrderUrl, paymentDetails, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            }
        })
            .then(response => {
                console.log('order placed');
            })
            .catch(error => {
                console.log(error);
            });
        


    }




    return (
        <><Nav />
            <div className="row mt-3" style={{ width: '100%' }}>
                <div className="col-lg-8"><div className="row">{renderCart()}</div></div>
                <div className="col-lg-4 place">

                    <h1 style={{ color: 'red' }} className="total">Total: <i className="fas fa-inr"></i> {total}</h1>


                    <div className="forms d-flex justify-content-center mb-4 mt-3">
                        <form className="row g-3 needs-validation" action="http://localhost:4100/paynow" method="POST">
                            <input type="hidden" name="cost" value={total} />
                            <input type="hidden" name="id" value={id} />
                            <input type="hidden" name="phone" value={phone} />
                            <input type="hidden" name="email" value={email} />
                            <div className="col-md-12">
                                <label htmlFor="fname" className="form-label">Full name</label>
                                <input type="text" name="name" value={user} className="form-control" id="fname" required />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>

                            <hr />
                            <h4>Delivery Address</h4>
                            <div><input type="text" className="form-control" placeholder="please enter your address" required /></div>
                            <div className="col-md-6">
                                <label htmlFor="city" className="form-label">City</label>
                                <input type="text" className="form-control" id="city" required />
                                <div className="invalid-feedback">
                                    Please provide a valid city.
                                </div>
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="state" className="form-label">State</label>
                                <input type="text" className="form-control" id="state" required />
                                <div className="invalid-feedback">
                                    Please select a valid state.
                                </div>
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="zip" className="form-label">Zip</label>
                                <input type="text" className="form-control" id="zip" required />
                                <div className="invalid-feedback">
                                    Please provide a valid zip.
                                </div>
                            </div>

                            <div className="col-12">

                                <button type="submit" onClick={() => checkout()} className="btn btn-warning">Place order and Pay <i className="fas fa-inr"></i> {total}</button>
                            </div>
                        </form>
                    </div>

                </div>

            </div>

        </>
    )
}

export default Orders;