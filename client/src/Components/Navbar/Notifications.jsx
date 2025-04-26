import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Box, Button, Drawer, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  contactUsGetData,
  updateMessage,
} from "../../Redux/contactus/contact.action";
import Loading from "../Loader/Loading";

const Notifications = ({ isOpen, toggleDrawer }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector(
    (state) => state.contactusReducer
  );

  useEffect(() => {
    dispatch(contactUsGetData({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleRead = (id) => {
    dispatch(updateMessage(id, { isRead: true }));
    toggleDrawer(false);
    navigate(`/contact-us`);
  };

  useEffect(() => {
    if (isError) {
      toast.error("Error fetching FAQs");
    }
  }, [isError]);

  if (isLoading) return <Loading />;

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={toggleDrawer(false)}
      width={{ sm: "90%", md: "50%", lg: "50%" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Typography variant="h5">Notifications</Typography>

        <Button onClick={toggleDrawer(false)} sx={{ fontSize: "2.5rem" }}>
          <IoCloseCircle />
        </Button>
      </Box>
      <Box sx={{ m: 2 }}>
        {data?.data?.map((message) => (
          <Box
            key={message._id}
            mb={1}
            p={2}
            borderRadius={4}
            boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
            onClick={() => handleRead(message._id)}
            sx={{
              cursor: "pointer",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1" fontWeight={"bold"}>
                {message.name}{" "}
                <Typography component="span" variant="body2">
                  ({message.email})
                </Typography>
              </Typography>

              <Typography variant="body2">{message.message_type}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1">{message.message}</Typography>
              {message.isRead ? <DoneAllIcon color="success" /> : <DoneIcon />}
            </Box>
          </Box>
        ))}
      </Box>
    </Drawer>
  );
};

export default Notifications;
