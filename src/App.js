import SignIn from "./components/SignIn";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

function App() {
  const { curUser } = useContext(UserContext);

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={curUser ? <Navigate replace to="/dashboard" /> : <SignIn />}
        />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
