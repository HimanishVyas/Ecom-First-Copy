import react, {useState, useEffect} from 'react';
import {Form, Button, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {savePaymentMethod} from '../actions/cartActions';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

function PaymentScreen({history}){
	const cart = useSelector(state => state.cart)
	const {shippingAddress} = cart

	const dispatch = useDispatch()

	const [paymentMethod, setPaymentMethod] = useState('PayPal')

	if( !shippingAddress.address ){
		history.push('/shipping')
	}

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(savePaymentMethod(paymentMethod))
		history.push('/placeorder')
	}

    return(
        <FormContainer style={{ textAlign : 'center'}}>
            <CheckoutSteps step1 step2 step3/>

            <form action="" onSubmit={submitHandler}>
                
				<Form.Group>
					<Form.Label as='legend' >Select Method</Form.Label>
					<Col>
						<Form.Check
							type = 'radio'
							label = 'Paypal or Credit Card'
							id= 'paypal'
							name = 'paymentMethod'
							checked
							onChange = {(e) => setPaymentMethod(e.target.value)}
						>

						</Form.Check>
					</Col>
				</Form.Group>
				
                <br></br>

                <Button type='submit' variant='primary' >Continue</Button>
            </form>
            
        </FormContainer>
    );
}

export default PaymentScreen;