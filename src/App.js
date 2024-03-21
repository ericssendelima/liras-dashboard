import "./App.css";
import { useState } from "react";


import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

//Pages
import Dashboard from "./pages/dashboard/dashboard";
import Login from "./pages/login/login";

function App() {
  const [isLogged, setIsLogged] = useState(false);//tem que ficar false quando estiver pronto
  // const [isLogged] = useState(true);//tem que ficar false quando estiver pronto

  const checkLog = () => {
    setIsLogged(!isLogged);
  }

  

  return (
    <div className="App">
      <HashRouter>
          <Routes>
            <Route path="/" element={isLogged ? <Navigate to="/dashboard" /> : <Login checkLog={checkLog}/>} />
            <Route path="/dashboard" element={isLogged ? <Dashboard checkLog={checkLog}/> : <Login checkLog={checkLog}/>} />

          </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
