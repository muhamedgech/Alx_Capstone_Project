import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; 
import { useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import Marketview from "./components/Marketview";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminPage from "./components/AdminPage";
import AdminHeader from "./components/AdminHeader"; 
import Logout from "./components/Logout";

function App() {
  const { selectedRoom } = useSelector((state) => state.building);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-300">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <div className="flex flex-1">
                <Sidebar />
                <Marketview selectedRoom={selectedRoom} />
              </div>
              <Footer />
            </>
          }
        />
        <Route path="/marketview" element={<Marketview selectedRoom={selectedRoom} />} />
        <Route path="/login" element={ <><Header /><Login setIsAuthenticated={setIsAuthenticated} /> <Footer /></>} />
        <Route path="/register" element={<><Header /><Register /><Footer /></>} />
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <>
                <AdminHeader />
                <AdminPage />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </div>
  );
}

export default App;
