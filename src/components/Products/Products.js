import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../State/StateProvider/StateProvider';
import './Products.css'

function Products({id,title,price,image,rating}) {
    
    const [{user},dispatch] = useStateValue();
    const history = useHistory();

    const addToBasket = ()=>{

        if(user){
            dispatch({
                type: 'ADD TO BASKET',
                item: {
                    id,
                    title,
                    price,
                    image,
                    rating
                }
            })
        }else{
            history.push('/login')
        }
        
    } 
    return (
        <div className='products'>
            <div className="products_info">
                <p>{title}</p>
                <p className="products_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="products_rating">
                    {Array(rating).fill().map((i,index)=> <p key={index}>⭐</p> )}
                </div>
            </div>
            <img src={image} alt={title}/>
            <button onClick={addToBasket}>Add to cart</button>
        </div>
    )
}

export default Products
