import {
  Box,
  Button,
  CircularProgress,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../Components/Loader/Loading";
import {
  updateLectures,
  GetSinglelecture,
  GetAllLectures,
} from "../../Redux/lectures/lecture.action";
import {
  applyMode,
  empty,
  GovTypes,
  initaialImpLinks,
  initialAgeCont,
  initialFeeCont,
  initialImpDate,
  initialInputData,
  initialInstructConst,
  initialStates,
  jobType,
  Sectors,
} from "../../utils/constants";
import { formatDateTimeIST } from "../../utils/common_func";

const EditJob = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const editor = useRef(null);

  // Initial Input Form Data
  const [newPost, setNewpost] = useState(initialInputData);
  const [impDatesCont, setImpDatesCont] = useState(initialImpDate);
  const [applicationFee, setApplicationFee] = useState(initialFeeCont);
  const [qualification, setQualification] = useState(empty);
  const [ageLimits, setAgeLimits] = useState(initialAgeCont);
  const [vacancyDetails, setVacancyDetails] = useState(empty);
  const [instruction, setInstruction] = useState(initialInstructConst);
  const [links, setLinks] = useState(initaialImpLinks);

  const { id } = useParams();
  const navigate = useNavigate();

  const { jobDetails, isLoading, isError } = useSelector(
    (state) => state.JobReducer
  );
  useEffect(() => {
    dispatch(GetSinglelecture(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!isLoading && isError === null && jobDetails) {
      setNewpost({
        ...jobDetails,
        post_date: formatDateTimeIST(jobDetails?.important_dates?.post_date),
        last_date: formatDateTimeIST(jobDetails?.important_dates?.last_date),
      });
      setImpDatesCont(jobDetails?.important_dates?.content || initialImpDate);
      setApplicationFee(jobDetails?.application_fee || initialFeeCont);
      setQualification(jobDetails?.qualification || empty);
      setAgeLimits(jobDetails?.age_limits || initialAgeCont);
      setVacancyDetails(jobDetails?.vacancy_details || empty);
      setInstruction(jobDetails?.instruction || initialInstructConst);
      setLinks(jobDetails?.important_links || initaialImpLinks);
    }
  }, [id, isLoading, isError, jobDetails]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setNewpost((prevPost) => ({
      ...prevPost,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleLinkChange = (index, field, value) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    const newLinks = [...links];
    newLinks[index].file = file;
    setLinks(newLinks);
  };

  const handleAddLink = () => {
    setLinks([{ link_name: "", link: "", file: null, type: "URL" }, ...links]);
  };

  const handleRemoveLink = (index) => {
    if (
      links.length > 1 ||
      (links.length === 1 &&
        (links[0].link_name || links[0].link || links[0].file))
    ) {
      const newLinks = links.filter((_, i) => i !== index);
      setLinks(newLinks);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);

    // Stucture the form data
    const formData = {
      ...newPost,
      important_dates: {
        post_date: newPost.post_date,
        last_date: newPost.last_date,
        content: impDatesCont,
      },
      important_links: links,
    };

    // Delete unwanted fields
    delete formData.post_date;
    delete formData.last_date;

    // Add states only if governmentType is 'state' and states have value
    if (applicationFee.trim() !== empty)
      formData.application_fee = applicationFee;
    if (ageLimits.trim() !== empty) formData.age_limits = ageLimits;
    if (vacancyDetails.trim() !== empty)
      formData.vacancy_details = vacancyDetails;
    if (instruction.trim() !== empty) formData.instruction = instruction;
    if (qualification.trim() !== empty) formData.qualification = qualification;

    dispatch(updateLectures(id, formData))
      .then((res) => {
        if (res === "SUCCESS") {
          toast.success("Data Updated successfully!");
          setLoading(false);
          dispatch(GetAllLectures());
        } else {
          toast.error(res);
        }
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : isError ? (
        <h1>{"Something went wrong"}</h1>
      ) : (
        <div>
          {/* --------------------form-------------------- */}

          <Typography
            marginTop={"50px"}
            variant="h4"
            sx={{ textAlign: "center" }}
          >
            EDIT POST
          </Typography>

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
                <FormLabel>Heading(optional)</FormLabel>
                <TextField
                  fullWidth
                  type="text"
                  name="heading"
                  placeholder="Heading"
                  value={newPost?.heading || ""}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormLabel>Vacancy Title*</FormLabel>
                <TextField
                  fullWidth
                  type="text"
                  placeholder="Vacancy Title"
                  name="vacancy_title"
                  value={newPost?.vacancy_title || ""}
                  onChange={handleInputChange}
                  disabled={loading}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormLabel>Advertisement(Optional)</FormLabel>
                <TextField
                  fullWidth
                  type="text"
                  placeholder="Advertisement"
                  name="advertisement"
                  value={newPost?.advertisement || ""}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </Grid>
            </Grid>

            {/* Gov Type, Sector, Institution */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormLabel>Government Type*</FormLabel>
                <Select
                  fullWidth
                  name="gov_type"
                  value={newPost?.gov_type || ""}
                  onChange={handleInputChange}
                  disabled={loading}
                  required
                >
                  {GovTypes?.map((govType) => (
                    <MenuItem key={govType} value={govType}>
                      {govType.toLocaleUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormLabel>Sector(optional)</FormLabel>
                <Select
                  fullWidth
                  name="sector"
                  value={newPost?.sector || ""}
                  onChange={handleInputChange}
                  disabled={loading}
                >
                  {Sectors?.map((sector) => (
                    <MenuItem key={sector.name} value={sector.value}>
                      {sector.name?.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormLabel>Institution*</FormLabel>
                <TextField
                  fullWidth
                  type="text"
                  placeholder="Institution"
                  name="institution"
                  value={newPost?.institution || ""}
                  onChange={handleInputChange}
                  disabled={loading}
                  required
                />
              </Grid>
            </Grid>

            {newPost?.gov_type === "state" && (
              <Box mb={2}>
                <FormLabel>State*</FormLabel>
                <Select
                  fullWidth
                  placeholder="Select State"
                  name="states"
                  value={newPost?.states || ""}
                  onChange={handleInputChange}
                  disabled={loading}
                >
                  {initialStates?.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            )}

            {/*post-date, last-date, apply-from */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormLabel>Post Date*</FormLabel>
                <TextField
                  fullWidth
                  type="datetime-local"
                  placeholder="Post Date"
                  name="post_date"
                  value={newPost?.post_date || ""}
                  onChange={handleInputChange}
                  disabled={loading}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormLabel>Last Date*</FormLabel>
                <TextField
                  fullWidth
                  type="datetime-local"
                  placeholder="Last Date"
                  name="last_date"
                  value={newPost?.last_date || ""}
                  onChange={handleInputChange}
                  disabled={loading}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormLabel>Apply Link Avl. From (optional)</FormLabel>
                <TextField
                  fullWidth
                  type="datetime-local"
                  placeholder="Post Date"
                  name="apply_link_avl_from"
                  value={newPost?.apply_link_avl_from || ""}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </Grid>
            </Grid>

            {/* Apply Mode, Job type, Total posts */}
            <Box mt={2}>
              <Grid container spacing={2} alignItems="center" mb={2}>
                <Grid item xs={12} md={4}>
                  <FormLabel>Apply Mode</FormLabel>
                  <Select
                    fullWidth
                    name="apply_mode"
                    value={newPost?.apply_mode || ""}
                    onChange={handleInputChange}
                    disabled={loading}
                  >
                    {applyMode?.map((mode) => (
                      <MenuItem key={mode} value={mode}>
                        {mode.toLocaleUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormLabel>Job Type</FormLabel>
                  <Select
                    fullWidth
                    name="job_type"
                    value={newPost?.job_type || ""}
                    onChange={handleInputChange}
                    disabled={loading}
                    // required
                  >
                    {jobType?.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type.toLocaleUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormLabel>Total Posts(optional)</FormLabel>
                  <TextField
                    fullWidth
                    type="number"
                    placeholder="Total Posts"
                    name="total_post"
                    value={newPost?.total_post || ""}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Description */}
            <Box mb={2}>
              <FormLabel>Description*</FormLabel>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Description"
                name="description"
                value={newPost?.description || null}
                onChange={handleInputChange}
                disabled={loading}
                required
              />
            </Box>

            {/* Important Dates Content */}
            <Box mb={2}>
              <FormLabel>Important Dates Content (optional)</FormLabel>
              <JoditEditor
                ref={editor}
                value={impDatesCont}
                onBlur={(newContent) => setImpDatesCont(newContent)}
                disabled={loading}
                // required
              />
            </Box>

            {/* Application Fee */}
            <Box mb={2}>
              <FormLabel>Application Fee (optional)</FormLabel>
              <JoditEditor
                ref={editor}
                value={applicationFee}
                onBlur={(newContent) => setApplicationFee(newContent)}
                disabled={loading}
                // required
              />
            </Box>

            {/* Age Limits */}
            <Box mb={2}>
              <FormLabel>Age Limits (optional)</FormLabel>
              <JoditEditor
                ref={editor}
                value={ageLimits}
                onBlur={(newContent) => setAgeLimits(newContent)}
                disabled={loading}
                // required
              />
            </Box>

            {/* Vacancy Details */}
            <Box mb={2}>
              <FormLabel>Qualification (optional)</FormLabel>
              <JoditEditor
                ref={editor}
                value={qualification}
                onBlur={(newContent) => setQualification(newContent)}
                disabled={loading}
                // required
              />
            </Box>

            {/* Vacancy Details */}
            <Box mb={2}>
              <FormLabel>Vacancy Details (optional)</FormLabel>
              <JoditEditor
                ref={editor}
                value={vacancyDetails}
                onBlur={(newContent) => setVacancyDetails(newContent)}
                disabled={loading}
                // required
              />
            </Box>

            {/* Instruction */}
            <Box mb={2}>
              <FormLabel>Instruction (optional)</FormLabel>
              <JoditEditor
                ref={editor}
                value={instruction}
                onBlur={(newContent) => setInstruction(newContent)}
                disabled={loading}
                // required
              />
            </Box>

            {/* Important Links */}
            <Box mt={2}>
              <FormLabel>Important Links</FormLabel>
              {links.map((link, index) => (
                <Grid
                  container
                  spacing={2}
                  key={index}
                  alignItems="center"
                  mb={2}
                >
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      placeholder="Link Name"
                      value={link.link_name}
                      onChange={(e) =>
                        handleLinkChange(index, "link_name", e.target.value)
                      }
                      disabled={loading}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    {link.type === "URL" ? (
                      <TextField
                        placeholder="URL"
                        value={link.link}
                        onChange={(e) =>
                          handleLinkChange(index, "link", e.target.value)
                        }
                        disabled={loading}
                        fullWidth
                      />
                    ) : (
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(index, e)}
                        disabled={loading}
                        style={{ width: "100%" }}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} md={2}>
                    <Select
                      value={link.type}
                      onChange={(e) =>
                        handleLinkChange(index, "type", e.target.value)
                      }
                      disabled={loading}
                      fullWidth
                    >
                      <MenuItem value="URL">URL</MenuItem>
                      <MenuItem value="File">File</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2}>
                    <IconButton
                      onClick={() => handleRemoveLink(index)}
                      disabled={loading}
                      color="error"
                    >
                      <MdDeleteForever />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Button
                onClick={handleAddLink}
                disabled={loading}
                variant="contained"
                color="primary"
              >
                Add Link
              </Button>
            </Box>

            {/* Switch Buttons */}
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap={{ xs: 1, sm: 1 }}
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography fontSize={{ xs: "12px", sm: "14px" }}>
                  Live
                </Typography>
                <Switch
                  color="success"
                  checked={newPost.is_live}
                  name="is_live"
                  onChange={handleInputChange}
                />
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography fontSize={{ xs: "12px", sm: "14px" }}>
                  AdmitCard
                </Typography>
                <Switch
                  color="success"
                  checked={newPost.is_admitcard_avl}
                  name="is_admitcard_avl"
                  onChange={handleInputChange}
                />
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography fontSize={{ xs: "12px", sm: "14px" }}>
                  Results
                </Typography>
                <Switch
                  color="success"
                  checked={newPost.is_results_avl}
                  name="is_results_avl"
                  onChange={handleInputChange}
                />
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography fontSize={{ xs: "12px", sm: "14px" }}>
                  Running Post
                </Typography>
                <Switch
                  color="success"
                  checked={newPost.is_new_post}
                  name="is_new_post"
                  onChange={handleInputChange}
                />
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography fontSize={{ xs: "12px", sm: "14px" }}>
                  Quick Post
                </Typography>
                <Switch
                  color="success"
                  checked={newPost.is_quick_link}
                  name="is_quick_link"
                  onChange={handleInputChange}
                />
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography fontSize={{ xs: "12px", sm: "14px" }}>
                  Answer Key
                </Typography>
                <Switch
                  color="success"
                  checked={newPost.is_answerkey}
                  name="is_answerkey"
                  onChange={handleInputChange}
                />
              </Box>
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
                onClick={() => navigate("/jobs")}
                variant="outlined"
                color="secondary"
                disabled={loading}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </div>
      )}
    </>
  );
};

export default EditJob;
