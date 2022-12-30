import react, {useState, useEffect} from 'react';
import { Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer';
import { getOrderDetails } from '../actions/orderActtions'

function  OrderScreen({match}){
    const orderId = match.params.id
    const dispatch = useDispatch()

	const orderDetails = useSelector(state => state.orderDetails)
	const {order, loading, error} = orderDetails


	if(!loading && !error){
    order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

	
	useEffect(() => {
        
            if(!order || order._id !== Number(orderId)){
            dispatch(getOrderDetails(orderId))
        }
	},[dispatch, order, orderId])

	


  return loading ? (
  <Loader/>
  ):error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <div>
        <h1>Order: {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong> {order.user.name}</p>
                        <p><strong>Emial: </strong><a href={`mailto:${order.user.email}`}></a></p>
                        <p>
                            <strong>Shipping: </strong>
                            {order.shippingAddress.address},
                            {' '}
                            {order.shippingAddress.city},
                            {' '}
                            {order.shippingAddress.postalCode},
                            {' '}
                            {order.shippingAddress.country}
                        </p>



                        {order.isDilivered ? (
                            <Message variant='success'>Dilivered on {order.deliceredAt}</Message>
                        ) : (
                            <Message variant='warning'>Not Dilivered</Message>
                        )
                    }
                    </ListGroup.Item>


                    <ListGroup.Item>
                        <h2>Payment Method</h2>


                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        
                        </p>
                        {order.isPaid ? (
                            <Message variant='success'>Paid on {order.paidAt}</Message>
                        ) : (
                            <Message variant='warning'>Not Paid</Message>
                        )
                    }

                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? <Message variant='info'>
                             order Is Empty
                        </Message> : (
                             <ListGroup variant='flush'>
                                 {order.orderItems.map((item, index) => (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                <Image src={item.Image} alt={item.name} fluid rounded />
                                            </Col>

                                            <Col>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>

                                            <Col md={4}>
                                                {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)} 
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                 ))}   
                             </ListGroup>
                        )
                        }

                       
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            
            <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Item:</Col>
                            <Col>${order.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping:</Col>
                            <Col>${order.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Tax:</Col>
                            <Col>${order.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Total:</Col>
                            <Col>${order.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    </ListGroup>
            </Card>
        </Col>
        </Row>
    </div>
  )
}

export default OrderScreen
