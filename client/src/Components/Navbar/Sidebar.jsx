import {
  Close as CloseIcon,
  ContactMail as ContactMailIcon,
  Dashboard as DashboardIcon,
  Work as WorkIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../../img/png3.png";
import { SiGnuprivacyguard } from "react-icons/si";
import { useSelector } from "react-redux";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { profile } = useSelector((state) => state.loginReducer);

  let links = [
    { name: "Lectures", href: "/", icon: <DashboardIcon /> },
    { name: "Assignment", href: "/assignments", icon: <WorkIcon /> },
    {
      name: "Analytics",
      href: "/progress/analytics",
      icon: <ContactMailIcon />,
    },
    { name: "Add New Student", href: "/register", icon: <SiGnuprivacyguard /> },
  ];

  if (profile.role === "student") {
    links = links.filter(
      (link) => link.name === "Lectures" || link.name === "Assignment"
    );
  }

  const handleLinkClick = (href) => {
    navigate(href);
    if (isMobile) {
      onClose();
    }
  };

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      anchor="left"
      open={isOpen}
      onClose={onClose}
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          background: "#1a365d",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: {
            lg: "center",
            xs: "space-between",
            md: "space-between",
          },
          p: 2,
          zIndex: 1300,
        }}
      >
        <Avatar src={img} ml={2} sx={{ width: 170, height: 70 }} />
        {isMobile && (
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      <List>
        {links.map((link) => (
          <ListItem
            key={link.name}
            onClick={() => handleLinkClick(link.href)}
            sx={{ color: "white", cursor: "pointer" }}
          >
            <ListItemIcon sx={{ color: "white" }}>{link.icon}</ListItemIcon>
            <ListItemText primary={link.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
