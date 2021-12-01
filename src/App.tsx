import React from 'react';
import './App.css';
import Sidebar from "./Components/Sidebar";
import FlowContent from "./Components/FlowContent";

function App() {
  return (
    <div className="app h-screen flex">
      <Sidebar />
      <FlowContent />
    </div>
  );
}

export default App;
