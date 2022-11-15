import React, { useEffect, useState } from 'react'
import CartPageCard from './CartPageCard'
import './CSS/CartPage.css'
import TotalItemsCost from './TotalItemsCost'

const CartPage = ({ finalCartItems, cartValue, setCost, cost}) => {

    const [quantity, setQuantity] = useState(cartValue)

    const setIncrement = (incre) => {
      incre === true ? setQuantity(prevValue => prevValue + 1) : setQuantity(prevValue => prevValue - 1)
    }

    const getTotalCost = (cost) => {
      setCost(cost)
    }

    useEffect(() => {
        document.body.classList.add('cartpagemaindiv')
        
        return () => {
            document.body.classList.remove('cartpagemaindiv')
        }
    })
  return (
    <>
      <div>
          <h2 className='yourcart'>Your Cart</h2>

          <div className='cart'>
              <div className='row' id='cartitems'>
                {finalCartItems.map(item => <CartPageCard item={item} key={item.id} setIncrement={setIncrement} getTotalCost={getTotalCost} cost={cost}/>)}
              </div>

              <TotalItemsCost cartValue={cartValue} quantity={quantity} cost={cost}/>
          </div>
      </div>
    </>
  )
}

export default CartPage