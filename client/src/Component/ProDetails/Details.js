import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DetailsDisplay from "./DetailsDisplay";
import Nav from "../Nav";
const detailsUrl = "https://winkart.onrender.com/product/"

const Details = () => {
    let params = useParams();
    let detailUrl = `${detailsUrl}${params.prodId}`
    sessionStorage.setItem('prodId', params.prodId)
    const [Details, setDetails] = useState();

    useEffect(() => {
        axios
            .get(detailUrl)
            .then((response) => {
                const { data } = response;
                setDetails(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    return (<><Nav />
        <div>
            <div></div>
            <DetailsDisplay passDetails={Details} />
        </div>
    </>
    )
}

export default Details;