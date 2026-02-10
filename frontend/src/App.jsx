import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Student from "./pages/Student";
import Home from "./pages/home";
import Staff from "./pages/Staff";
import Admin from "./pages/Admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/dashboard" element={<Layout />}>
        {/* default page */}
        <Route index element={<Navigate to="home" />} />

        <Route path="home" element={<Home />} />
        <Route path="student" element={<Student />} />
        <Route path="staff" element={<Staff />} />
        <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default App;
