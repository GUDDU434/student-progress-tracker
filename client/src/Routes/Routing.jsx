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
import RoleBasedRoute from "./RoleBasedRoute";
import { useSelector } from "react-redux";

const Routing = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigation = useNavigate();
    const { profile } = useSelector((state) => state.loginReducer);
  

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
                  {/* Lectures Routes */}
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/lectures" element={<Dashboard />} />
                  <Route
                    path="/lectures/edit/:id"
                    element={
                      <RoleBasedRoute
                        isAuthenticated={isAuth}
                        allowedRoles={["admin", "teacher"]}
                        userRole={profile?.role}
                      >
                        <EditLecture />
                      </RoleBasedRoute>
                    }
                  />
                  <Route
                    path="/lectures/details/:id"
                    element={<LectureDetails />}
                  />

                  {/* Assignments Routes */}
                  <Route path="/assignments" element={<Assignment />} />
                  <Route
                    path="/assignments/edit/:id"
                    element={
                      <RoleBasedRoute
                        isAuthenticated={isAuth}
                        allowedRoles={["admin", "teacher"]}
                        userRole={profile?.role}
                      >
                        <EditAssignment />
                      </RoleBasedRoute>
                    }
                  />
                  <Route
                    path="/assignments/details/:id"
                    element={<AssignmentDetails />}
                  />

                  {/* Analytics Routes */}
                  <Route
                    path="/progress/analytics"
                    element={
                      <RoleBasedRoute
                        isAuthenticated={isAuth}
                        allowedRoles={["admin", "teacher"]}
                        userRole={profile?.role}
                      >
                        <ProgressAnalytics />
                      </RoleBasedRoute>
                    }
                  />

                  <Route
                    path="/register"
                    element={
                      <RoleBasedRoute
                        isAuthenticated={isAuth}
                        allowedRoles={["admin", "teacher"]}
                        userRole={profile?.role}
                      >
                        <Register />
                      </RoleBasedRoute>
                    }
                  />
                  <Route
                    path="*"
                    element={() => (
                      <h1 style={{ textAlign: "center", marginTop: "200px" }}>
                        404 Page Not Found
                      </h1>
                    )}
                  />
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
