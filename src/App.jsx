import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./webpages/Login"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<Login mode="SIGN_IN"/>} />
        <Route path="/sign-up/merchant" element={<Login mode="SIGN_UP_MERCHANT"/>} />
        <Route path="/sign-in/merchant" element={<Login mode="SIGN_IN_MERCHANT"/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
