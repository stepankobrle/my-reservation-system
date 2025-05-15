import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../../frontend/src/pages/Delimano/homepage.tsx";
import Menu from "../../frontend/src/pages/Delimano/menu.tsx";
import Rezervace from "../../frontend/src/pages/Delimano/rezervace.tsx";
import Dashboard from "../../frontend/src/pages/adminPages/dashboard.tsx";
import Layout from "../../frontend/src/admin/shared/layout.tsx";
import NotificationPage from "./pages/adminPages/notifications.tsx";
import {NotificationsProvider} from "./context/notificationsContext.tsx";
import {ReservationProvider} from "./context/reservationsContext.tsx";
import ReservationPage from "./pages/adminPages/reservations.tsx";
import TableManagment from "./pages/adminPages/tableManagment";
import MenuManagment from "./pages/adminPages/menuManagment.tsx";
import CalendarPage from "./pages/adminPages/calendarPage";
import {ProtectedRoute} from "./admin/components/auth/protectedRoute";
import AdminLogin from "./pages/adminPages/login.tsx";
import {AuthProvider} from "./admin/components/auth/authProvider";


function App() {
  const [count, setCount] = useState(0)

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* Add other routes here */}
          <Route path="/menu" element={<Menu />} />
          <Route path="/rezervace" element={<Rezervace />} />


            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin routy */}
                <Route path="/admin" element={
                    <ProtectedRoute>
                        <AuthProvider>
                            <NotificationsProvider>
                                <ReservationProvider>
                                     <Layout />
                                </ReservationProvider>
                            </NotificationsProvider>
                        </AuthProvider>
                    </ProtectedRoute>
                    }>

                    <Route index element={<Dashboard />} />
                    <Route path="calendar" element={<CalendarPage />} />
                    <Route path="notification" element={<NotificationPage />} />
                    <Route path="reservations" element={<ReservationPage />} />
                    <Route path="tablemanagment" element={<TableManagment/>} />
                    <Route path="menumanagment" element={<MenuManagment/>} />

                    {/* další admin podstránky */}
                </Route>
        </Routes>

      </Router>
  )
}
export default App