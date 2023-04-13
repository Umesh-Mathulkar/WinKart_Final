import React from "react";
import { Link, useLocation } from 'react-router-dom';
import Nav from "./Nav";
import './Search.css'
const Search = () => {

    const location = useLocation();
    const searchResults = location.state?.searchResults;

    console.log(searchResults)

    return (
        <><Nav />
            {
                searchResults.map((item) => {
                    return (<>
                        <div className="d-flex justify-content-center">
                            <Link to={`/details/${item.product_id}`} className="container ser d-flex">
                                <img src={item.image} width={"100px"} />
                                <div className="serLink">
                                    {item.product_name}</div>
                            </Link>
                        </div>
                    </>)
                })
            }

        </>
    )
}
export default Search;