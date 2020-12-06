import React from 'react'
import { useStateValue } from '../../State/StateProvider/StateProvider';
import './CheckOutProduct.css'

function CheckOutProduct({id,title,price,image,rating,hidebutton}) {
    const [,dispatch] = useStateValue();
    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE FROM BASKET',
            id,
        })
    }
    return (
        <div className='checkoutProduct'>
            <img src={image} alt="product" className="checkoutProduct_image"/>
            <div className="checkoutProduct_info">
                <p className="checkoutProduct_title">
                    {title}
                </p>
                <p className="checkoutProduct_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct_rating">
                    {Array(rating).fill().map((i,index)=> <p key={index}>⭐</p> )}
                </div>
                { !hidebutton && (<button onClick={removeFromBasket}>Remove from basket</button>)}
            </div>
        </div>
    )
}

export default CheckOutProduct
