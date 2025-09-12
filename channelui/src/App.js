import {useState} from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom";

import "./static/bootstrap-5.3.3-dist/css/bootstrap.min.css";
import "./code.css";
// import "./App.css";
// import "./static/styles.css";
// import "./style.css";

import Status_Page from "./pages/status"
import Tech_Home from "./pages/techHome"
import HomePage from "./pages/homePage"
// import Navbar from "./components/Navbar"
import HeaderItem from "./components/Header";
import ServicePage from "./pages/services";
function App(props) {

  const [dashseed,setDashseed] = useState(0);


  const dashboardseed = () => {

      setDashseed(Math.random());

  }


  return (
    // <BrowserRouter basename="/ui">
    <BrowserRouter basename="/">
    {/* <Navbar keyupdate={dashboardseed}/> */}
    <HeaderItem/>
    <Routes>
    <Route path = "/" element={<HomePage/>}/>
    <Route path = "/home/" element={<HomePage/>}/>
    {/* <Route path = "/services/:ordertype" element={<ServicePage/>}/> */}
    <Route path = "/services/" element={<ServicePage/>}/>
    <Route path = "/services/:orderref" element={<ServicePage/>}/>
    <Route path = "/status/" element={<Status_Page/>}/>
    <Route path = "/status/:orderref" element={<Status_Page/>}/>
    <Route path = "/techhome/" element={<Tech_Home/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
