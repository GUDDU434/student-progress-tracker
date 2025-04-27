import {
  Box,
  Button,
  CircularProgress,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  GetAllAssignments,
  GetSingleassignment,
} from "../../Redux/assignment/assignment.action";
import useAxiosPrivate from "../../utils/useAxiosPrivate";

const EditAssignment = ({ toggleDrawer, isDrawerOpen }) => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // Initial Input Form Data
  const [newPost, setNewpost] = useState({
    title: "",
    description: "",
    due_date: "",
    track: "",
    submission_link: "",
  });
  const { id } = useParams();
  const navigate = useNavigate("");

  const { assignmentDetails, isLoading, isError } = useSelector(
    (state) => state.AssignmentReducer
  );

  useEffect(() => {
    dispatch(GetSingleassignment(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (!isLoading && isError === null && assignmentDetails) {
      setNewpost(assignmentDetails);
    }
  }, [assignmentDetails, isError, isLoading]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setNewpost((prevPost) => ({
      ...prevPost,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);

    axiosPrivate
      .put("/api/v1/assignments", newPost)
      .then((res) => {
        toast.success("Data saved successfully!");

        // Clear the form fields
        setNewpost({
          title: "",
          description: "",
          due_date: "",
          track: "",
          submission_link: "",
        });
        setLoading(false);
        toggleDrawer(false);
        dispatch(GetAllAssignments());
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      {/* <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{ style: { width: "100%", margin: "auto" } }}
      > */}
      {/* ------close button---------- */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Button sx={{ fontSize: "2.5rem" }}>
          <IoCloseCircle />
        </Button>
      </Box>

      {/* --------------------form-------------------- */}
      <Box
        component="form"
        onSubmit={handleSave}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mb: "2rem",
          padding: "16px",
        }}
      >
        {/* Loading overlay */}
        {loading && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 9999,
            }}
          >
            <CircularProgress size={50} />
          </Box>
        )}

        {/* Heading and vacancy title, advertisement */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <FormLabel>Title*</FormLabel>
            <TextField
              fullWidth
              type="text"
              name="title"
              placeholder="Title"
              value={newPost?.title || ""}
              onChange={handleInputChange}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormLabel>Description*</FormLabel>
            <TextField
              fullWidth
              type="text"
              name="description"
              placeholder="Description"
              value={newPost?.description || ""}
              onChange={handleInputChange}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormLabel>Start and Time*</FormLabel>
            <TextField
              fullWidth
              type="datetime-local"
              placeholder="Start Date"
              name="start_date"
              value={newPost?.start_date || ""}
              onChange={handleInputChange}
              disabled={loading}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormLabel>End Date & Time*</FormLabel>
            <TextField
              fullWidth
              type="datetime-local"
              placeholder="Due Date"
              name="due_date"
              value={newPost?.due_date || ""}
              onChange={handleInputChange}
              disabled={loading}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormLabel>Track*</FormLabel>
            <Select
              fullWidth
              name="track"
              value={newPost?.track || ""}
              onChange={handleInputChange}
              disabled={loading}
              required
            >
              <MenuItem value={"mern"}>MERN</MenuItem>
              <MenuItem value={"java"}>java</MenuItem>
            </Select>
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Stack direction="row" justifyContent="end" spacing={2} mt={4}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            Save
          </Button>
          <Button
            onClick={() => navigate("/assignments")}
            variant="outlined"
            color="secondary"
            disabled={loading}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
      {/* </Drawer> */}
      <ToastContainer />
    </div>
  );
};

export default EditAssignment;
