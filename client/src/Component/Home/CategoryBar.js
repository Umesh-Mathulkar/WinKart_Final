import React, { Component } from "react";
import axios from "axios";
import './CategoryBar.css'
import { Link } from "react-router-dom"
const catUrl = "https://winkart.onrender.com/category"


class CategoryBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: '',
            isLoading: true
        }

    }

    renderCategory = (data) => {
        if (data) {
            return data.map((item) => {
                return (
                    <Link to={`/allProd/${item.category_id}`} key={item.category_id}> <div className="cardHome">
                        <div className="catImg d-flex justify-content-center"><img src={item.image} alt='catImg' /></div>
                        <h6 className="text-center">{item.category}</h6>

                    </div></Link>

                )
            })
        }
    }




    render() {
        return (
            <>
                <div className="containers justify-content-center mt-3">
                    {this.state.isLoading ? (
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (this.renderCategory(this.state.categories)
                    )}


                </div>
            </>
        )
    }




    //api calling

    componentDidMount() {
        axios
        .get(catUrl)
        .then((response) => {
          this.setState({ categories: response.data, isLoading: false });
        })
        .catch((error) => {
          console.error(error);
        });
    }
}

export default CategoryBar;