import { Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Toolbar,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AuthContext } from "../../auth/AuthContext";
import {
  getUserDetails,
  updateUserDetails,
} from "../../Redux/auth/auth.action";
// import { contactUsGetData } from "../../Redux/contactus/contact.action";
import { userRole } from "../../utils/constants";
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Navbar = ({ onOpen }) => {
  const { user } = useContext(AuthContext);
  const [userModal, setUserModal] = useState(false);
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState();
  const [editable, setEditable] = useState(false);
  const { profile } = useSelector((state) => state.loginReducer);

  console.log("profile", profile);

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  useEffect(() => {
    setUserDetails(profile);
  }, [profile, user]);

  const handleCloseUserModal = () => {
    setUserModal(false);
  };

  const getAvatarLatter = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleSaveUserDetails = () => {
    dispatch(updateUserDetails(profile?._id, userDetails)).then(() =>
      dispatch(getUserDetails())
    );
    setEditable(false);
    toast.success("User Details updated successfully!");
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: 1100,
          background: "#1a365d",
          boxShadow: "none",
          width: "100%",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open menu"
            onClick={onOpen}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }}>
            {/* <Avatar sx={{ width: 66, height: 66 }} src={img} /> */}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box onClick={() => setUserModal(true)}>
              <Avatar />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Modal open={userModal} onClose={handleCloseUserModal}>
        <Box
          sx={{
            position: "absolute",
            top: "8%",
            right: "2%",
            width: { xs: "90%", sm: "75%", md: "50%", lg: "30%" },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
          }}
        >
          {/* Avatar Section */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Avatar
              sx={{
                bgcolor: getRandomColor(),
                width: 100,
                height: 100,
                fontSize: 40,
              }}
              src={userDetails?.profile_pic}
            >
              {getAvatarLatter(userDetails?.name || "")}
            </Avatar>
          </Box>

          {/* User Information */}
          <Box>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              label="Name"
              value={userDetails?.name}
              onChange={(e) => {
                setUserDetails({ ...userDetails, name: e.target.value });
              }}
              InputProps={{
                readOnly: !editable,
              }}
            />
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              label="Email"
              value={userDetails?.email}
              InputProps={{
                readOnly: !editable,
              }}
              disabled
            />
            <Select
              disabled={profile?.role !== "admin" || !editable}
              variant="outlined"
              fullWidth
              value={userDetails?.role}
              onChange={(e) =>
                setUserDetails({ ...userDetails, role: e.target.value })
              }
            >
              {userRole?.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </Box>

          {/* Edit Button */}
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            {!editable ? (
              <Button
                variant="outlined"
                size="small"
                onClick={() => setEditable(!editable)}
                sx={{ textTransform: "none" }}
              >
                Edit
              </Button>
            ) : (
              <Button
                variant="outlined"
                size="small"
                onClick={handleSaveUserDetails}
                sx={{ textTransform: "none" }}
              >
                Save
              </Button>
            )}
          </Box>

          {/* Logout Button */}
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Navbar;
