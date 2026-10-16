import {BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Event from "./pages/Events"
import MyEvents from "./pages/MyEvents"


function App(){
  return(
    <BrowserRouter>
    <Navbar/>
    <div style={{padding: "20px"}}>
      <Routes>
        <Router path="/" element={<Home/>}/>
        <Router path="/login" element={<Login/>}/>
        <Router path="/register" element={<Register/>}/>
        <Router path="/events" element={<Events/>}/>
        <Router path="/my-events" element={<MyEvents/>}/>
        <Route path="/events/:id" element={<EventDetails />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;