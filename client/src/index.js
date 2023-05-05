import React from "react";
import ReactDOM from "react-dom";
//starting to use redux 
//provider is going to keep track of store which is global and that allows us to use it from anywhere 

// import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import  {createStore,applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {reducers} from './reducers';
import App from "./App";
import './index.css';

const store=createStore(reducers,compose(applyMiddleware(thunk)));


// const root = createRoot(document.getElementById('root'));
// root.render(<App />);
ReactDOM.render(
    // <StrictMode>
      <Provider store={store}> {/* HERE */}
        <App /> {/* Now, App is wrapped in Provider and hence can read from store */}
      </Provider>,
    // </StrictMode>,
    document.getElementById('root')
  )



// ReactDOM.render(
// <Provider store={store}>
// <App />

// </Provider>,
// //with this our application is  successfully using redux 
// // and we can use all its capabilities

// document.getElementById('root'),
// );
