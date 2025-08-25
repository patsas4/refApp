import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
//import Dashboard from "./pages/Dashboard";
//import Assignments from "./pages/Assignments";
import ProtectedRoute from "./components/ProtectedRoute";
import RegistrationPage from "./pages/RegistrationPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
