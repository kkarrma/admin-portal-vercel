import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./webpages/Login"
import Sidebar from "./components/Sidebar"
import Dashboard from "./webpages/Dashboard"

function App() {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/sign-in" element={<Login mode="SIGN_IN" />} />
          <Route path="/sign-up/merchant" element={<Login mode="SIGN_UP" />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  )
}

export default App
