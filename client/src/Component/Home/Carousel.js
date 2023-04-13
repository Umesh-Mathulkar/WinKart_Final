import React, { Component } from "react";
import './Carousel.css'
import first from './carouselImg/flipkart-big-savings-days-sale-offers-discounts-and-offers-1592561708.jpg';
import second from './carouselImg/one.jpg';
import third from './carouselImg/screenshot-2021-10-08-123645.jpg'


class Carousel extends Component {
    render() {
        return (
            <>
                <div id="carouselExample" className="carousel slide mt-3">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={first} className="d-block w-100" alt={"..."} />
                        </div>
                        <div className="carousel-item">
                            <img src={second} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={third} className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </>
        )
    }
}

export default Carousel;