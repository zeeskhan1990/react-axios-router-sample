import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from "axios"



axios.interceptors.request.use((reqConfig) => {
    console.log(reqConfig)
    //if not returned then you are blocking the request itself
    //return either config or promise of same to be used in individual req configs
    //Can add some common headers like auth
    return reqConfig
}, (err) => {
    //return the rejected promise to be used in individual req err handlers
    return Promise.reject(err)
})

axios.interceptors.response.use((response) => {
    console.log(response)
    //if not returned then you are blocking the response and can't be used in the individual response handler
    return response
}, (err) => {
    //return the rejected promise to be used in individual req err handlers
    return Promise.reject(err)
})

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
