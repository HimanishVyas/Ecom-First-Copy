import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

import {listProducts} from '../actions/productActions';


function HomeScreen({history}){
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products, page, pages } = productList

	

    useEffect(()=>{
        dispatch(listProducts())
    },[dispatch])


    return(
    <div>
        
	    <h1 style={{textAlign:'center'}}>Trending Products</h1>
        <hr></hr>
	        {loading ? <Loader />
	            : error ? <Message variant='danger'>{error}</Message>
		            :
		                <div>
		                    <Row>
				                {products.map(product =>(
					                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
					                    <Product product={product} />
					                </Col>
				                ))}
			                </Row>
			                
		                </div>
	        }

    </div>
    );
}

export default HomeScreen;