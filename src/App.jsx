import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./webpages/Login"
import Sidebar from "./components/Sidebar"
import Dashboard from "./webpages/Dashboard"
import Refund from "./webpages/Refund"
import RefundV2 from "./webpages/Refund-v2"
import ReturnRefund from "./webpages/Return-refund"

function App() {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/sign-in" element={<Login mode="SIGN_IN" />} />
<<<<<<< HEAD
          <Route path="/sign-up/merchant" element={<Login mode="SIGN_UP_MERCHANT" />} />
          <Route path="/sign-in/merchant" element={<Login mode="SIGN_IN_MERCHANT" />} />
          
          <Route path="/orders/return-and-refund" element={<Refund />} />
          <Route path="/orders/return-v2" element={<RefundV2 />} />
          <Route path="/orders/return-refund" element={<ReturnRefund />} />
          
=======
          <Route path="/sign-up/merchant" element={<Login mode="SIGN_UP" />} />
>>>>>>> c5aded19deeaac44838e4cca821cf99ee2e630fc
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  )
}

export default App
