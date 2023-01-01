import react, {useState, useEffect} from 'react';
import { Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message'
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants' 

function PlaceOrderScreen({history}){

	const orderCreate = useSelector(state => state.orderCreate)
	const {order, success, error} = orderCreate

	const cart = useSelector(state => state.cart)

	cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
	cart.shippingPrice = (cart.itemsPrice > 100000 ? 0 : 2500).toFixed(2)
	cart.taxPrice = ((0.079) * cart.itemsPrice).toFixed(2)
	cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

	if(!cart.paymentMethod){
		history.push('/payment')
	}

	useEffect(() => {
		if(success){
            
			history.push(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
		}
	},[success, history])

	const dispatch = useDispatch()
	const placeOrder = () =>{
		dispatch(createOrder({
			orderItems:cart.cartItems,
			shippingAddress:cart.shippingAddress,
			paymentMethod:cart.paymentMethod,
			itemsPrice:cart.itemsPrice,
			shippingPrice:cart.shippingPrice,
			taxPrice:cart.taxPrice,
			totalPrice:cart.totalPrice,
		}))
	}


  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>

                        <p>
                            <strong>Shipping: </strong>
                            {cart.shippingAddress.address},
                            {' '}
                            {cart.shippingAddress.city},
                            {' '}
                            {cart.shippingAddress.postalCode},
                            {' '}
                            {cart.shippingAddress.country}
                        </p>
                    </ListGroup.Item>


                    <ListGroup.Item>
                        <h2>Payment Method</h2>

                        <p>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? <Message variant='info'>
                            Your Cart Is Empty
                        </Message> : (
                             <ListGroup variant='flush'>
                                 {cart.cartItems.map((item, index) => (
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
                            <Col>${cart.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping:</Col>
                            <Col>${cart.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Tax:</Col>
                            <Col>${cart.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Total:</Col>
                            <Col>${cart.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>


                    <ListGroup.Item>
                        {error && <Message variant='denger'>{error}</Message>}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Button     type='butten'
                                    className='btn-block'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrder}>
                                        Place Order
                                    </Button>
                    </ListGroup.Item>
                    </ListGroup>
            </Card>
        </Col>
        </Row>
    </div>
  )
}

export default PlaceOrderScreen
