import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../../frontend/src/pages/Delimano/homepage.tsx";
import Menu from "../../frontend/src/pages/Delimano/menu.tsx";
import Rezervace from "../../frontend/src/pages/Delimano/rezervace.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* Add other routes here */}
          <Route path="/menu" element={<Menu />} />
            <Route path="/rezervace" element={<Rezervace />} />
        </Routes>
      </Router>
  )
}
export default App