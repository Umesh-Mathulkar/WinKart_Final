import React from "react";
import axios from "axios";
import './DetailsDisplay.css'
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";




const catUrl = "https://winkart.onrender.com/category"
const cartUrl="https://winkart-cart.onrender.com/api/auth/cartPost"
// const cartUrl="https://winkart-cart.onrender.com/api/auth/cartPost"


const DetailsDisplay = (props) => {
    // const[qty,setQty]=useState(1);
    const[orderId,setId]=useState();
    
    
    
    let navigate=useNavigate();
   
    
    const handleAddToCart = async (arrays) => {
        
        if(sessionStorage.getItem('userInfo')){
            const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            const email = userInfo['email'];
        
          fetch(cartUrl, {
            method: 'POST',
            headers: {
              'accept': 'application/json',
              'content-type': 'application/json'
            },
            body: JSON.stringify({ email, orderId: arrays.product_id })
          })
        
          .catch(error => console.error('Error adding:', error))
          navigate('/orders')
        }
    else{
        alert("Please Login First")
        navigate('/login')
    }
    }

          






    //  render Subtab
    const RenderTab = (subTab) => {

        if (subTab) {
            return (
                <div>
                    {subTab.map((item) => {
                        return (
                            <div className="proAligns" key={item._id}>
                                <li className="nav-item">

                                    <Link to={`/allProd/${item.category_id}`} className="nav-link" aria-current="page" href="#">{item.category}</Link>

                                </li>
                            </div>



                        )
                    })}
                </div>
            )
        }
        else {
            return (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )
        }

    }
    //  render Subtab end


    // api call for subTab

    const RenderSubTab = () => {
        const [subTab, setSubTab] = useState();
        useEffect(() => {
            axios
            .get(catUrl)
            .then((response) => {
              const { data } = response;
              setSubTab(data);
            })
            .catch((error) => {
              console.error(error);
            });

        })

        return (
            <div>
                <ul className="nav mt-2 justify-content-center">
                    {RenderTab(subTab)}
                </ul>
                <hr />
            </div>
        )
    }
    // api call for subTan end

    // add to cart
    // const handleQty=(event)=>{
    //      setQty(event.target.value)
            
        
    // }



    // add to cart end



    // main details Render
    const renderDetails = ({ passDetails }) => {

        if (passDetails) {
            return (
                <div className="detailsMain">

                    <div className="row disp">
                        <div className="detailsImg container col-lg-6">
                            <img src={passDetails[0]['image']} />
                        </div>
                        <div className="col-lg-6">
                            <div className="container detailsInfo">
                                <h2 className="mt-3">{passDetails[0]['product_name']}</h2>
                                <p>{passDetails[0]['description']}</p>
                                <h4>Just Rs. {passDetails[0]['Price'].toLocaleString()}</h4>
                                <form>
                                    
                                    <div id="buyMain"> <button id="buy" type="submit" onClick={() => { handleAddToCart(passDetails[0]) }} className="btn btn-success mt-4">Buy Now {passDetails[0]['company']} {passDetails[0]['subCat_name']}</button></div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            )
        }
        else {
            return (
                <div className="d-flex justify-content-center">
                    <div className="spinner-grow" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )
        }
    }
    // main details Render end

    // return function
    return (
        <div>
            {RenderSubTab()}
            {renderDetails(props)}
        </div>
    )
}


export default DetailsDisplay;