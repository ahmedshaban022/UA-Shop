import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import {DataProvider} from './GlobalState';
import Header from "./components/header/Header";
import MainPages from "./components/mainPages/Pages";

import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <DataProvider>
      <Router>
  
          <div className="App">
            <Header/>
            <MainPages/>
          </div>
      </Router>
      <ToastContainer
          position="top-left"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
      
    </DataProvider>
  );
}

export default App;
