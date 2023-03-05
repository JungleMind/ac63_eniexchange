import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './pages/Register';
import Accueil from './components/Accueil';
import "./fonts/Long_Shot.ttf";
import "./fonts/Louis George Cafe Light.ttf";
import "./fonts/Louis George Cafe.ttf";
import "./fonts/Louis George Cafe Bold.ttf";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Login/>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="accueil" element={<Accueil />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;