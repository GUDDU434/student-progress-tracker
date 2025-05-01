import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Navbar/Sidebar";
import Assignment from "../Pages/Assignments/Assignments";
import Login from "../Pages/auth/Login";
import Dashboard from "../Pages/Lectures/Lectures";
import ProtectedRoute from "./ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditAssignment from "../Pages/Assignments/EditAssignment";
import Register from "../Pages/auth/Register";
import EditLecture from "../Pages/Lectures/EditLecture";
import LectureDetails from "../Pages/Lectures/LectureDetails";
import ProgressAnalytics from "../Pages/Ananytics/ProgressAnalytics";
import AssignmentDetails from "../Pages/Assignments/AssignmentDetails";

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
                  <Route path="/assignments" element={<Assignment />} />
                  <Route
                    path="/assignments/edit/:id"
                    element={<EditAssignment />}
                  />
                  <Route
                    path="/assignments/details/:id"
                    element={<AssignmentDetails />}
                  />
                  <Route
                    path="/progress/analytics"
                    element={<ProgressAnalytics />}
                  />
                  <Route path="/lectures/edit/:id" element={<EditLecture />} />
                  <Route
                    path="/lectures/details/:id"
                    element={<LectureDetails />}
                  />
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
