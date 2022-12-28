import react, {useState, useEffect} from 'react';
import { Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message'
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

function PlaceOrderScreen() {
    const cart = useSelector(state => state.cart)  

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 500 ? 0 : 50).toFixed(2)
    cart.TaxPrice = Number((0.083) * cart.itemsPrice).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.TaxPrice)).toFixed(2) 

    const PlaceOrder = () => {
        console.log('Place Order')
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
                            {cart.shippingMethod}
                        
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
                            <Col>${cart.TaxPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Total:</Col>
                            <Col>${cart.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Button     type='butten'
                                    className='btn-block'
                                    disabled={cart.cartItems === 0}
                                    onClick={PlaceOrder}>
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
