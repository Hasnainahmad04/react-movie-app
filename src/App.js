import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar";
import Movies from "./components";
import Rental from "./components/Rental";
import Customers from "./components/Customers";
import Notfound from "./components/Notfound";
import Movieform from "./components/movieForm";
import LoginForm from "./components/Loginform";
import Register from "./components/RegisterForm";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ToastContainer />
      <div className="component">
        <Routes>
          <Route path="/customers" element={<Customers />} />
          <Route path="/rental" element={<Rental />} />
          <Route path="/movies/:id" element={<Movieform />} />
          <Route path="/not-found" element={<Notfound />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/movies" />} />
          <Route path="/movies" element={<Movies />} />

          <Route path="/*" element={<Navigate to="/not-found" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
