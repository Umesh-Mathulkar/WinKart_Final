import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import ProductsDisplay from './ProductsDisplay';
import Nav from '../Nav';
import './Products.css'
const subCatUrl = "https://winkart.onrender.com/subCat/"



const Products = () => {
    let params = useParams();
    sessionStorage.setItem('subCatId',params.subCatId);
    const subCatId = sessionStorage.getItem('subCatId')
    let subUrl = `${subCatUrl}${subCatId}`
    

    const [productslist, setList] = useState()
  

    useEffect(() => {
        fetch(subUrl, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setList(data)
            })
    }, [])


   

    const productHead = (productslist) => {
        if (productslist) {
            return productslist[0]['subCat_name']
        }

    }

    return (<> <Nav/>
        <div>

            <div className='container mt-4 mb-4'>
                <h2 className='text-center'>Buy {productHead(productslist)} Now!</h2>
            </div>

            <div className='proListMain'>
                <ProductsDisplay ProList={productslist}  />
            </div>
        
        </div>
        </>
    )
}



export default Products;