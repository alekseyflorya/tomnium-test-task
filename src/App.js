import React, {useState, useEffect} from 'react';
import getData from "./API";
import './App.scss';

function App() {
  const [state, setState] = useState({
    base: '',
    rates: [],
    timestamp: '',
    valid: true,
    appID: ''
  });
  const {base, rates, timestamp, valid, appID} = state;

  useEffect(() => {
    getData().then(data => {
      setState(state => ({
        ...state,
        base: data.base,
        rates: data.rates,
        timestamp: data.timestamp,
        valid: data.valid
      }));
    });
  },[]);

  const handleChange = (e) => {
    setState({...state, appID: e.target.value});
  }

  const handleClick = () => {
    getData(appID).then(data => {
      setState(state => ({
        ...state,
        base: data.base,
        rates: data.rates,
        timestamp: data.timestamp,
        valid: false
      }));
    });
  }
  return (
    <div className="container">
      <h1 className="title">Base currency: {base}</h1>
      <p className="date">Timestamp: {new Date(timestamp*1000).toLocaleString()}</p>
      <p>{valid ? ' Data from local file' : 'Data from Open Exchange Rates'}</p>
      <p className="info-text">This is local data from test file. If you want to get data from Open Exchange Rates enter your App ID to input field and press button 'LOAD'</p>
      <div className="input-block">
        <input type="text" value={appID} onChange={handleChange} className="input" placeholder="Input App ID"/>
        <button onClick={handleClick} className="button">LOAD</button>
      </div>
      <div className="list">
        {Object.entries(rates).map(([key, value]) => {
          return (
            <div className="list-item" key={key}>
              <span className="list-key">{key}: </span> <span className="list-value">{value.toFixed(3)}</span>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
