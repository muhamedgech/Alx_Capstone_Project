import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import Marketview from "./components/Marketview";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const { selectedRoom } = useSelector((state) => state.building);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <Marketview selectedRoom={selectedRoom} />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
