import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./webpages/Login"
import Sidebar from "./components/Sidebar"
import Dashboard from "./webpages/Dashboard"
import { useState } from "react"
import Refund from "./webpages/Refund"
import RefundV2 from "./webpages/Refund-v2"
import ReturnRefund from "./webpages/Return-refund"
import Product from "./webpages/Product"

function App() {

  const [accountStatus, setAccountStatus] = useState(false);

  return (
    <BrowserRouter>
      <Sidebar accountStatus={{ value: accountStatus, setter: setAccountStatus }}>
        <Routes>
          <Route path="/sign-in" element={<Login mode="SIGN_IN" accountStatus={{ value: accountStatus, setter: setAccountStatus }} />} />
          <Route path="/sign-in/merchant" element={<Login mode="SIGN_IN_MERCHANT" accountStatus={{ value: accountStatus, setter: setAccountStatus }} />} />
          <Route path="/sign-up/merchant" element={<Login mode="SIGN_UP" accountStatus={{ value: accountStatus, setter: setAccountStatus }} />} />
          
          <Route path="/orders/return-and-refund" element={<Refund />} />
          <Route path="/orders/return-v2" element={<RefundV2 />} />
          <Route path="/orders/return-refund" element={<ReturnRefund />} />
          <Route path="/orders/product" element={<Product />} />
          
          
          {/* Protected Routes */}
          <Route path="/" element={
            accountStatus ?
              (<Dashboard />)
              :
              (<Navigate to="/sign-in" replace />)} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  )
}

export default App
