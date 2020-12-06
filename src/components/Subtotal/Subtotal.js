import React from 'react';
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from '../../State/StateProvider/StateProvider';
import { useHistory } from 'react-router-dom';

function Subtotal() {

    const history = useHistory();

    const getBasketTotal=(basket)=>{
        return basket?.reduce((sum, item) => sum + item.price,0)
    }

    const [{basket,user}] = useStateValue();

    return (
        <div className='subtotal'>
            <CurrencyFormat
                renderText={value => (<>
                <p>
                    Subtotal ({basket?.length} items):<strong>{value}</strong>
                </p>
                <small className="subtotal_gift">
                    <input type="checkbox" name="" id=""/>This order contains a gift
                </small>
                    </>)}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'} />
                <button onClick={e =>{
                    if(user){
                        history.push('/payment')
                    }else{
                        history.push('/login')
                    } 
                    
                }}>
                    Proceed to Checkout
                </button>
        </div>
    )
}

export default Subtotal
