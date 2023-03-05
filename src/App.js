import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './pages/Register';
import Accueil from './components/Accueil';
import Question from './components/Question';
import Ask from './components/Ask';
import Users from './components/Users';
import Detailquestion from './components/Detailquestion';
import "./fonts/Long_Shot.ttf";
import "./fonts/Louis George Cafe Light.ttf";
import "./fonts/Louis George Cafe.ttf";
import "./fonts/Louis George Cafe Bold.ttf";
import Protected from './components/Protected';


function App() {
  const isSignedIn = localStorage.getItem("isSignedIn");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route index element={<Login/>} /> */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route 
            path="accueil" 
            element={
              <Protected isSignedIn={isSignedIn}>
                <Accueil />
              </Protected>
            } 
          />
          <Route 
            path="question" 
            element={
              <Protected isSignedIn={isSignedIn}>
                <Question />
              </Protected>
            } 
          />
          <Route 
            path="demander" 
            element={
              <Protected isSignedIn={isSignedIn}>
                <Ask />
              </Protected>
            } 
          />
          <Route 
            path="utilisateurs" 
            element={
              <Protected isSignedIn={isSignedIn}>
                <Users />
              </Protected>
            } 
          />
           <Route 
            path="detailquestion" 
            element={
              <Protected isSignedIn={isSignedIn}>
                <Detailquestion />
              </Protected>
            } 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;