import { Route, Routes } from "react-router-dom"
import Main from "./pages/main";
import Auth from "./pages/auth";

export default function App() {
  return <>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  </>
}