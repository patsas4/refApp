import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
//import Assignments from "./pages/Assignments";
import ProtectedRoute from "./components/ProtectedRoute";
import RegistrationPage from "./pages/RegistrationPage";
import CreateGame from "./pages/CreateGame";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-game" element={<CreateGame />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
