import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./webpages/Login"
import Sidebar from "./components/Sidebar"
import Dashboard from "./webpages/Dashboard"
import { useState } from "react"

function App() {

  const [accountStatus, setAccountStatus] = useState(false);

  return (
    <BrowserRouter>
      <Sidebar accountStatus={{ value: accountStatus, setter: setAccountStatus }}>
        <Routes>
          <Route path="/sign-in" element={<Login mode="SIGN_IN" accountStatus={{ value: accountStatus, setter: setAccountStatus }} />} />
          <Route path="/sign-in/merchant" element={<Login mode="SIGN_IN_MERCHANT" accountStatus={{ value: accountStatus, setter: setAccountStatus }} />} />
          <Route path="/sign-up/merchant" element={<Login mode="SIGN_UP" accountStatus={{ value: accountStatus, setter: setAccountStatus }} />} />
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
