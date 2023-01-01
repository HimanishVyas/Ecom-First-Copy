import react, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Form, Button, Row, Col, Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {getUserDetails, updateUserProfile} from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstants';
import { listMyOrders } from '../actions/orderActions';


function ProfileScreen({history}){

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userLogin= useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile= useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderListMy= useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error:errorOrders, orders } = orderListMy


    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }else{
            if(!user || !user.name || success || userInfo._id !== user._id){
                dispatch({ type:USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
                
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password != confirmPassword){
            setMessage('Passwords do not Match!')
        }else{
            dispatch(updateUserProfile({
                'id' : user._id,
                'name' : name,
                'email' : email,
                'password' : password,

            }))
            setMessage('')
        }

    }

    return(
        <Row>
            <Col md={3}>
                <h2 style={{ textAlign : 'center'}}>User Profile</h2>

                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}

                <Form action="" onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange ={(e) => setName(e.target.value )}
                        >
                        </Form.Control>
                    </Form.Group>

                    <br></br>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange ={(e) => setEmail(e.target.value )}
                        >
                        </Form.Control>
                    </Form.Group>

                    <br></br>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange ={(e) => setPassword(e.target.value )}
                        >
                        </Form.Control>
                    </Form.Group>

                    <br></br>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange ={(e) => setConfirmPassword(e.target.value )}
                        >
                        </Form.Control>
                    </Form.Group>

                    <br></br>
                    <div className='text-center'><Button type='submit' variant='primary' >Update</Button></div>

                </Form>
            </Col>

            <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
            <Loader/>
        ) : errorOrders ? (
            <Message variant='denger'>{errorOrders}</Message>
        ) : (
                <Table striped responsive className='table-sm'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Data</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivred</th> 
                        <th> </th>
                    </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                                    <tr>

                                        <td>{order._id}</td>
										<td>{order.createdAt.substring(0,10)}</td>
										<td>&#8377;{order.totalPrice}</td>
										<td>{order.isPaid ? order.paidAt.substring(0,10) :(
											<i className="fas fa-times" style={{color:'red'}}></i>
										)}</td>
										<td>
											<LinkContainer to={`/order/${order._id}`}>
												<Button className='btn-sm'>Details</Button>
											</LinkContainer>
										</td>
                                    </tr>
                        ))}
                    </tbody>
                </Table>
         )
        }
      </Col>
        </Row>
    );
}

export default ProfileScreen;