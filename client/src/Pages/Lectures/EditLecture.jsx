import {
    Box,
    Button,
    CircularProgress,
    FormLabel,
    Grid,
    MenuItem,
    Select,
    Stack,
    TextField
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    GetAllLectures,
    GetSinglelecture,
} from "../../Redux/lectures/lecture.action";
import useAxiosPrivate from "../../utils/useAxiosPrivate";

const EditLecture = ({ toggleDrawer, isDrawerOpen }) => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Initial Input Form Data
  const [newPost, setNewpost] = useState({
    lacture_title: "",
    lacture_date: "",
    lacture_video_link: "",
    lacture_material_link: "",
    track: "",
  });

  const { id } = useParams();
  const navigate = useNavigate("");

  const { lectureDetails, isLoading, isError } = useSelector(
    (state) => state.LectureReducer
  );

  useEffect(() => {
    dispatch(GetSinglelecture(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (!isLoading && isError === null && lectureDetails) {
      setNewpost(lectureDetails);
    }
  }, [lectureDetails, isError, isLoading]);

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

    axiosPrivate
      .post("/api/v1/lectures", formData)
      .then((res) => {
        toast.success("Data saved successfully!");

        // Clear the form fields
        setNewpost({
          lacture_title: "",
          lacture_date: "",
          lacture_video_link: "",
          lacture_material_link: "",
          track: "",
        });
        setLoading(false);
        // toggleDrawer(false);
        dispatch(GetAllLectures());
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
        // onClose={toggleDrawer(false)}
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
                name="lacture_video_link"
                value={newPost?.lacture_video_link || ""}
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
                name="lacture_material_link"
                value={newPost?.lacture_material_link || ""}
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
            onClick={() => navigate("/")}
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

export default EditLecture;
