import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Navbar/Sidebar";
import Job from "../Pages/Assignments/Assignments";
import Login from "../Pages/auth/Login";
import Dashboard from "../Pages/Lectures/Lectures";
import ProtectedRoute from "./ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditJob from "../Pages/Assignments/Edit";
import Register from "../Pages/auth/Register";

const Routing = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigation = useNavigate();

  const [isAuth, setIsAuth] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    localStorage.getItem("accessToken") ? setIsAuth(true) : setIsAuth(false);

    if (!isAuthenticated && !localStorage.getItem("accessToken")) {
      navigation("/login");
    }
  }, [navigation, isAuth, isAuthenticated]);

  return (
    <>
      {isAuth ? (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
          <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
          <Box component="main" sx={{ flexGrow: 2, p: 3 }}>
            <Navbar onOpen={handleSidebarToggle} />
            <Box>
              <Routes>
                <Route element={<ProtectedRoute isAuthenticated={isAuth} />}>
                  <Route path="/lactures" element={<Dashboard />} />
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/assignments" element={<Job />} />
                  <Route path="/assignments/edit/:id" element={<EditJob />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="*" element={() => <h1>404 Page Not Found</h1>} />
                </Route>
              </Routes>
            </Box>
          </Box>
        </Box>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
      <ToastContainer />
    </>
  );
};

export default Routing;
