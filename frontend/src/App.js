import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../../frontend/src/pages/Delimano/homepage.tsx";
import Menu from "../../frontend/src/pages/Delimano/menu.tsx";
import Rezervace from "../../frontend/src/pages/Delimano/rezervace.tsx";
import Dashboard from "../../frontend/src/pages/adminPages/dashboard.tsx";
import Layout from "../../frontend/src/admin/shared/layout.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* Add other routes here */}
          <Route path="/menu" element={<Menu />} />
          <Route path="/rezervace" element={<Rezervace />} />

            {/* Admin routy */}
            <Route path="/admin" element={<Layout />}>
                <Route index element={<Dashboard />} />
                {/* další admin podstránky */}
            </Route>

        </Routes>

      </Router>
  )
}
export default App