import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom";

import "./style/Style.css"
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';
import {UserContextProvider} from "./context/userContext"

import { QueryClient, QueryClientProvider } from 'react-query';

import Favicon from "./images/Frame.png";
const favicon = document.getElementById("idFavicon");
favicon.setAttribute("href", Favicon);

const client = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserContextProvider>
    <QueryClientProvider client={client}>
      <Router>
    <App />
    </Router>
    </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>
);

reportWebVitals();
