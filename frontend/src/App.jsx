import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatApp from "./components/ChatApp";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Navbar from "./components/nAVBAR.JSX";
import Sidebar from "./components/Sidebar.jsx";

// Update the App component to use React Router
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<><Sidebar/><ChatApp /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}


export default App;