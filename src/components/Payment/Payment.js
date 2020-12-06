import { CardElement ,useElements, useStripe } from '@stripe/react-stripe-js';
import React,{ useState,useEffect} from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import instance from '../../axios/axios';
import { db } from '../../firebase';
import { useStateValue } from '../../State/StateProvider/StateProvider';
import CheckOutProduct from '../CheckOutProduct/CheckOutProduct';
import './Payment.css'

function Payment() {

    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();
    const [error,setError] = useState(null);
    const [disabled,setDisabled] = useState(true);
    const [succeeded,setSucceeded] = useState(false);
    const [processing,setProcessing] = useState("");
    const [clientSecret,setClientSecret] = useState("");

    const [{basket,user},dispatch] = useStateValue();

    useEffect(() => {
        const getClientSecret = async () =>{
            const response = await instance({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            })
            setClientSecret(response.data.clientSecret)
            
            
        }
        if(getBasketTotal(basket) > 1){
            getClientSecret()
        }

    }, [basket])

    const getBasketTotal=(basket)=>{
        return basket?.reduce((sum, item) => sum + item.price,0)
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(clientSecret.length > 1){
            setProcessing(true);

            stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            }).then(({paymentIntent}) => {
                
                db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
                    basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                })

                setSucceeded(true)
                setError(null)
                setProcessing(false)

                dispatch({
                    type: "EMPTY BASKET"
                })
    
                history.replace('/orders')
            })
        }
        

    };

    const handleChange = e => {
        setDisabled(e.empty)
        setError(e.error ? e.error.message : '')
    }

    return (
        <div className='payment'>
            <div className="payment_container">
                <h1>Checkout (<Link to='/checkout'>{basket?.length} items</Link>)</h1>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment_address">
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles,CA</p>
                    </div>
                </div>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className="payment_items">
                        {basket?.map((item, index) =>(
                            <CheckOutProduct
                            key={index}
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            image={item.image}
                            rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Payment Methods</h3>
                    </div>
                    <div className="payment_details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment_priceContainer">
                            <CurrencyFormat
                                renderText={value => (<>
                                <h3>
                                    Order Total: {value}
                                </h3>
                                    </>)}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'} />
                                <button className='payment_button' disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
