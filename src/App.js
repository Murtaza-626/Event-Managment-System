import {BrowserRouter , Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Events from "./pages/Events"
import MyEvents from "./pages/MyEvents"
import EventDetails from "./pages/EventDetails"
import ProtectedRoute from "./components/ProtectedRoute"
import "./App.css"


function App(){
  return(
    <BrowserRouter>
    <Navbar/>
    <div style={{padding: "20px"}}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/events" element={<Events/>}/>
        <Route path="/events/:id" element={<EventDetails />} />
        // Protect My Events route 
          <Route path="/my-events" element={
              <ProtectedRoute>
                <MyEvents />
              </ProtectedRoute>
            } 
          />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;