import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SPK from "./pages/SPK";
import SPKDetail from "./pages/SPKDetail";
import SPKEdit from "./pages/SPKEdit";
import Palet from "./pages/Palet";
import PaletDetail from "./pages/PaletDetail";
import Layout from "./components/layout/Layout";
import CreateSPK from "./pages/CreateSPK";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (email, role) => {
    setUser({ email, role });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/*"
          element={
            user ? (
              <Layout user={user} onLogout={handleLogout}>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/spk" element={<SPK />} />
                  <Route path="/spk/create" element={<CreateSPK />} />
                  <Route path="/spk/:id" element={<SPKDetail />} />
                  <Route path="/palet" element={<Palet user={user} />} />
                  <Route path="/spk/edit/:id" element={<SPKEdit />} />
                  <Route
                    path="/palet/:id"
                    element={<PaletDetail user={user} />}
                  />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
                <ToastContainer position="top-right" autoClose={2000} />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
