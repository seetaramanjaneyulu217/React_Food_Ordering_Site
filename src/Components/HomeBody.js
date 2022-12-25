import React,{ useEffect, useRef, useState } from 'react'
import Card from './Card'
import './CSS/HomeBody.css'

const HomeBody = ({ getTheCartValue, getTheItems, setCost }) => {

  const [itemsArray, setItemsArray] = useState([])

  const searchQuery = useRef('')

  const [fetchedData, setFetchedData] = useState([])
  const [cartValue, setCartValue] = useState(0)

  useEffect(() => {
    getTheCartValue(cartValue)
    getTheItems(itemsArray)
  },[cartValue])

  async function searchItems() {

    let itemsArray = []

    await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=929610251c2845ada4b6d307ccf21bd4&query=${searchQuery.current.value}`)
    .then(response => response.json())
    .then(data => {
       (data.results).forEach(item => {
          const newItem = {
            ...item,
            price: Math.floor(Math.random() * (100 - 20 + 1)) + 20
          }

          itemsArray.push(newItem)
       })
       setFetchedData(itemsArray)
    })
  }

  return (
    <>
        <div id='images'>
        
        </div>

        <br></br>
        <br></br>
        <br></br>
    
        <div className='itemssearch'>
          <h2>Search your items here</h2>
          <div className='formdiv'>
            <input type="text" className="form-control textinput" placeholder="Search food items" aria-label="Username" aria-describedby="basic-addon1" ref={searchQuery}/>&nbsp;&nbsp;
            <button type="button" className="btn btn-primary searchbutton" onClick={searchItems}>Search</button>
          </div>
          
          <div className='row' id='itemsdiv'>
            {(fetchedData.length === 0 || searchQuery.current.value === '') ? <h2>No items Found</h2> : fetchedData.map(item => <Card item={item} key={item.id} setCartValue={setCartValue} setItemsArray={setItemsArray} itemsArray={itemsArray} setCost={setCost} />)}
          </div>
        </div>

    </>
  )
}

export default HomeBody