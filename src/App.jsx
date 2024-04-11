import {Routes ,Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Footer from './components/Footer'
import "./service/socket"

import "./App.css"

function App() {

  return (
    <>
      <div>
        <Navbar/>
      </div>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
      <div>
        <Footer />
      </div>
    </>
  )
}

export default App