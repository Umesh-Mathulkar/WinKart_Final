import React from "react";
import './Footer.css'

const Footer=()=>{
    return(
        <div className="footer d-flex justify-content-center">
            <div className="row foot align-items-center">
                <div className="col-lg-4 text-center">
                    <h3>WinKart</h3>
                    <p>An E-commerce website with all products from beauty products to electronics products</p>
                </div>
                <div className="col-lg-4">
                        <div className="socialLink">
                            <h3>Social Links</h3>
                            <a href="https://www.linkedin.com/in/umesh-mathulkar-b29a9122a/" target="_blank"><i className="fa-brands fa-linkedin"></i> LinkedIn</a>
                            <a href="https://github.com/Umesh-Mathulkar" target="_blank"><i className="fa-brands fa-github"></i> GitHub</a>
                            <a href="https://www.instagram.com/umesh.mathulkar/" target="_blank"><i className="fa-brands fa-instagram"></i> Instagram</a>
                        </div>
                </div>
                <div className="col-lg-4 text-center add">
                        <h3>Address</h3>
                        <p>Nagpur, Maharashtra</p>
                </div>

            </div>
        </div>
    )
}

export default Footer;