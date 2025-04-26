import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetAllJobs } from "../../Redux/jobs/job.action";
import { initialInputData } from "../../utils/constants";
import useAxiosPrivate from "../../utils/useAxiosPrivate";

const AddAssignment = ({ toggleDrawer, isDrawerOpen }) => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Initial Input Form Data
  const [newPost, setNewpost] = useState(initialInputData);

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

    const formData = {
      ...newPost,
    };

    // Delete unwanted fields
    delete formData.post_date;
    delete formData.last_date;

    axiosPrivate
      .post("/api/v1/posts", formData)
      .then((res) => {
        toast.success("Data saved successfully!");

        // Clear the form fields
        setNewpost(initialInputData);
        setLoading(false);
        toggleDrawer(false);
        dispatch(GetAllJobs());
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{ style: { width: "100%", margin: "auto" } }}
      >
        {/* ------close button---------- */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Button onClick={toggleDrawer(false)} sx={{ fontSize: "2.5rem" }}>
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
                name="lacture_title"
                placeholder="Title"
                value={newPost?.lacture_title || ""}
                onChange={handleInputChange}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormLabel>Date and Time*</FormLabel>
              <TextField
                fullWidth
                type="datetime-local"
                placeholder="Lecture Date"
                name="lacture_date"
                value={newPost?.lacture_date || ""}
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

          {/*post-date, last-date, apply-from */}

          {/* Apply Mode, Job type, Total posts */}
          <Box mt={2}>
            <Grid container spacing={2} alignItems="center" mb={2}>
              <Grid item xs={12} md={4}>
                <FormLabel>Link to JOin</FormLabel>
                <TextField
                  fullWidth
                  type="text"
                  placeholder="Enter zoom invite link"
                  name="total_post"
                  value={newPost?.total_post || ""}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </Grid>{" "}
              <Grid item xs={12} md={4}>
                <FormLabel>Doc Link</FormLabel>
                <TextField
                  fullWidth
                  type="text"
                  placeholder="Document Link"
                  name="total_post"
                  value={newPost?.total_post || ""}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </Grid>
            </Grid>
          </Box>

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
              onClick={toggleDrawer(false)}
              variant="outlined"
              color="secondary"
              disabled={loading}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Drawer>
      <ToastContainer />
    </div>
  );
};

export default AddAssignment;
