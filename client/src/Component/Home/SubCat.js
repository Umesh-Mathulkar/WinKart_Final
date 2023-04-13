import React, { Component } from "react";
import axios from "axios";
import './SubCat.css'
import { Link } from "react-router-dom"

const categories = [
    { name: "Mobiles and Accessories", url: "https://winkart.onrender.com/catProd/1" },
    { name: "Electronics", url: "https://winkart.onrender.com/catProd/2" },
    { name: "Appliances", url: "https://winkart.onrender.com/catProd/4" },
    { name: "Fashion", url: "https://winkart.onrender.com/catProd/3" },
    { name: "Beauty", url: "https://winkart.onrender.com/catProd/5" }
];

class SubCat extends Component {
    constructor(props) {
        super(props);
        this.state = categories.reduce((state, { name }) => {
            return { ...state, [name.toLowerCase()]: '' };
        }, {});
    }

    renderCategory = (name, data) => {
        return (
            <div className="row rows" key={name}>
                <div className="subHead col-lg-2 justify-content-center d-flex"><h4>{name}</h4></div>
                <div className="col-lg-10">{this.renderCards(data)}</div>
            </div>
        );
    }

    renderCards = (data) => {
        if (data) {
            return data.map((item) => {
                return (
                    <div className="proAlign" key={item.subCat_id}>
                        <Link to={`/products/${item.subCat_id}`}>
                            <div className="cards">
                                <div className="proImg d-flex justify-content-center"><img src={item.image} /></div>
                                <h6 className="text-center">{item.subCat_name}</h6>
                            </div>
                        </Link>
                    </div>
                );
            });
        } else {
            return (
                <div className="d-flex justify-content-center" key={data._id}>
                    <div className="spinner-grow" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            );
        }
    }

    componentDidMount() {
        categories.forEach(({ name, url }) => {
            axios
                .get(url)
                .then((response) => {
                    const { data } = response;
                    this.setState({ [name.toLowerCase()]: data });
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    }

    render() {
        return (
            <>
                <div className="subCategory">
                    {categories.map(({ name }) => (
                        this.renderCategory(name, this.state[name.toLowerCase()])
                    ))}
                </div>
            </>
        );
    }
}

export default SubCat;
