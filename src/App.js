import React, {useEffect, useState} from "react";
import logo from './logo.svg';
import './App.css';
import axios from "axios";

function App() {
  const [price, setPrice] = useState(0);

  const getPrice = () => {
    axios
      .get("https://api.coinbase.com/v2/prices/BTC-USD/spot")
      .then((res) => {
        setPrice(res.data.data.amount); 
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPrice();
  }, []);

  return (
    <div className="App">
      <h1>The current BTC price is ${price}</h1>
    </div>
  );
}

export default App;
