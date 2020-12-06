import React from 'react'
import { useStateValue } from '../../State/StateProvider/StateProvider';
import CheckOutProduct from '../CheckOutProduct/CheckOutProduct';
import Subtotal from '../Subtotal/Subtotal'
import './Checkout.css'

function Checkout() {

    const [{basket,user}] = useStateValue();

    return (
        <div className='checkout'>
            <div className="checkout_left">
                <img src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="Ad" className="checkout_ad"/>
                <div>
                    <h3>Hello,{user?.email}</h3>
                    <h2 className="checkout_title">Your Shopping Basket</h2>
                    {basket?.map((item,index) =>(
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
            <div className="checkout_right">
                <Subtotal/>
            </div>
        </div>
    )
}

export default Checkout
