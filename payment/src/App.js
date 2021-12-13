import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout'

function App() {

  const [product,setProduct] = useState({
    name: "React from fb",
    price: 10,
    productBy: "facebook"
  })
const makePayment = token=>{
    const body = {
      token,
      product
    }
    const headers = {
      "Content-Type":"application/json"
    }
    return fetch('http://localhost:8080/payment',{
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(response=>{
      console.log("RESPONSE",response)
      const {status} = response;
      console.log("STATUS",status)
    })
    .catch(error => console.log(error));
};

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout stripeKey= "pk_test_51K5WZ2SHED3fFCZOKLUVAohO8haftRr2Myi4GET3twchgfdkRdRM1rzNghyvO4ZgS6r40bADzH2q2GyF019eHu7500BrRL7aff" token={makePayment} name="buy react">
          <button className= "submit">make payment {product.price}</button>
        </ StripeCheckout>
      </header>
    </div>
  );
}

export default App;
