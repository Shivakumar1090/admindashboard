import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Doctor from "./components/Doctor/doctor";
import Home from "./components/Home/home";
import Navbar from "./components/Navbar";
import Orders from "./components/Orders/orders";
import './app.css'

function App() {

  return (
    <div className="App">
      <Router>
      <ThemeProvider theme={THEME}>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/doctors" element={<Doctor />} />
            <Route exact path="/orders" element={<Orders />} />
          </Routes>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
          />
        </ThemeProvider>
      </Router>
    </div>
  );
}

const THEME = createTheme({
  typography: {
    fontFamily: "Varela Round",
    // color: "#791314",
  },
  // palette: {
  //   primary: {
  //     // main: '#791314'
  //   },
  // },


});

export default App;
