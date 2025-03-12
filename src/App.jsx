import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./webpages/Login"
<<<<<<< HEAD
import Refund from "./webpages/Refund"
=======
import Sidebar from "./components/Sidebar"
import Dashboard from "./webpages/Dashboard"
>>>>>>> 7ef5925fcae2de40ac088c648b922ea11ddf4314

function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
      <Routes>
        <Route path="/sign-in" element={<Login mode="SIGN_IN"/>} />
        <Route path="/sign-up/merchant" element={<Login mode="SIGN_UP_MERCHANT"/>} />
        <Route path="/sign-in/merchant" element={<Login mode="SIGN_IN_MERCHANT"/>} />
        <Route path="/refund" element={<Refund />} />
      </Routes>
=======
      <Sidebar>
        <Routes>
          <Route path="/sign-in" element={<Login mode="SIGN_IN" />} />
          <Route path="/sign-up/merchant" element={<Login mode="SIGN_UP_MERCHANT" />} />
          <Route path="/sign-in/merchant" element={<Login mode="SIGN_IN_MERCHANT" />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Sidebar>
>>>>>>> 7ef5925fcae2de40ac088c648b922ea11ddf4314
    </BrowserRouter>
  )
}

export default App
