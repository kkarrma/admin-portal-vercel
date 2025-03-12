import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./webpages/Login"
import Refund from "./webpages/Refund"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<Login mode="SIGN_IN"/>} />
        <Route path="/sign-up/merchant" element={<Login mode="SIGN_UP_MERCHANT"/>} />
        <Route path="/sign-in/merchant" element={<Login mode="SIGN_IN_MERCHANT"/>} />
        <Route path="/refund" element={<Refund />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
