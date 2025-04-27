import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deletelecture,
  GetAllLectures,
  updateLectures,
} from "../../Redux/lectures/lecture.action";
import { formatDate } from "../../utils/common_func";
import AddAssignment from "./AddAssignment";
import { GetAllAssignments } from "../../Redux/assignment/assignment.action";
import { FaCalendarAlt, FaUser } from "react-icons/fa";

const Assignments = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTxt, setSearchTxt] = useState("");
  const [filter, setFilter] = useState({});
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { AllAssignments } = useSelector((state) => state.AssignmentReducer);
  const { profile } = useSelector((state) => state.loginReducer);

  useEffect(() => {
    dispatch(GetAllAssignments({ page: page + 1, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const handleFilterModalOpen = () => {
    setFilter({});
    setIsFilterModalOpen(true);
  };
  const handleFilterModalClose = () => setIsFilterModalOpen(false);

  const handleChangePage = (event, newPage) => {
    setPage(() => newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSwitch = (id, e, eventType) => {
    const data = {};
    if (eventType === "live") data.is_live = e.target.checked;
    if (eventType === "admitcard") data.is_admitcard_avl = e.target.checked;
    if (eventType === "results") data.is_results_avl = e.target.checked;

    dispatch(updateLectures(id, data)).then((res) => {
      if (res === "SUCCESS") {
        toast.success("Post updated successfully!");
        dispatch(GetAllLectures());
      } else {
        toast.error("Something went wrong. Please try again later");
      }
    });
  };

  const handleEdit = (id) => {
    navigate(`/assignments/edit/${id}`);
  };

  const handleDelete = () => {
    dispatch(deletelecture(deleteId)).then((res) => {
      if (res === "SUCCESS") {
        toast.success("Post Deleted successfully!");
        dispatch(GetAllLectures());
      } else {
        toast.error("Something went wrong. Please try again later");
      }
      setIsDeleteModal(false);
      setDeleteId(null);
    });
  };

  const search = () => {
    dispatch(GetAllLectures({ search: searchTxt, limit: 100 }));
  };

  const handleFilter = (e) => {
    console.log(filter, "filter");
    e.preventDefault();
    dispatch(GetAllLectures({ ...filter, limit: 100 }));
    setIsFilterModalOpen(false);
  };

  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      setFilter((prevFilter) => ({
        ...prevFilter,
        date_range: `${dateRange.from}, ${dateRange.to}`,
      }));
    }
  }, [dateRange]);

  return (
    <Box sx={{ mt: "3rem", mx: { xs: "1rem", sm: "2rem", md: "3rem" } }}>
      <Typography variant="h4" gutterBottom>
        Assignments
      </Typography>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        sx={{ mb: 2, gap: { xs: 2, sm: 0 } }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={toggleDrawer(true)}
          sx={{
            borderRadius: 0,
            display: "flex",
            alignItems: "center",
            mb: { xs: 1, sm: 0 },
          }}
        >
          <IoMdAdd />
          Add New Assignment
        </Button>

        {/* Search & filter container */}
        {/* <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          gap="10px"
        >
          <Input
            placeholder="Search by title"
            sx={{ borderRadius: 0, mb: { xs: 1, sm: 0 } }}
            onChange={(e) => setSearchTxt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                search();
              }
            }}
          />
          <Button
            variant="contained"
            sx={{ borderRadius: 0, mb: { xs: 1, sm: 0 } }}
            onClick={search}
          >
            Search
          </Button>
          <Button
            variant="outlined"
            sx={{ borderRadius: 0, display: "flex", alignItems: "center" }}
            onClick={handleFilterModalOpen}
          >
            <IoFilter />
            <Typography>Filter</Typography>
          </Button>
        </Box> */}
      </Box>

      <TableContainer
        sx={{
          mt: 2,
          border: "1px solid gray",
          overflowX: "auto",
        }}
      >
        <Table fontSize={{ xs: "10px", sm: "12px" }}>
          <TableHead>
            <TableRow
              sx={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#1976d2",
              }}
            >
              <TableCell sx={{ color: "white" }}>Title</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {AllAssignments?.assignments?.length === 0 ? (
              <TableRow sx={{ textAlign: "center" }}>
                No data available
              </TableRow>
            ) : (
              AllAssignments?.assignments?.map((assignment, i) => (
                <TableRow
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: `${i % 2 === 0 ? "#c9d4e7" : "white"}`,
                  }}
                  key={assignment?._id}
                >
                  <TableCell
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleEdit(assignment._id)}
                  >
                    <Typography>{assignment?.title}</Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        marginTop: "5px",
                        color: "gray",
                      }}
                    >
                      <FaUser />: {assignment?.posted_by?.name}{" "}
                      <FaCalendarAlt />{" "}
                      {formatDate(assignment?.start_date, true)}{" "}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Switch
                      defaultChecked={assignment?.is_live}
                      color="success"
                      onChange={(e) => handleSwitch(assignment?._id, e, "live")}
                    />
                    <IconButton
                      color="error"
                      onClick={() => {
                        setIsDeleteModal(true);
                        setDeleteId(assignment?._id);
                      }}
                    >
                      <MdDelete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50, 100]}
            // component="div"
            count={AllAssignments?.total || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Table>
      </TableContainer>

      {/* Add New Post Component */}
      {(profile?.role === "admin" || profile?.role === "teacher") && (
        <AddAssignment
          isDrawerOpen={isDrawerOpen}
          toggleDrawer={toggleDrawer}
          mb={"rem"}
        />
      )}

      {/* Filter Modal */}
      <Modal
        open={isFilterModalOpen}
        onClose={handleFilterModalClose}
        aria-labelledby="filter-modal-title"
        aria-describedby="filter-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "70%", md: "50%" },
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="filter-modal-title" variant="h6" component="h2">
            Filter Lectures
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {/* Filter by date range */}
            <Grid item xs={12} md={6}>
              <FormLabel>Post Create: From</FormLabel>
              <Input
                fullWidth
                type="date"
                name="from"
                value={dateRange.from}
                onChange={(e) =>
                  setDateRange({ ...dateRange, from: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormLabel>To</FormLabel>
              <Input
                fullWidth
                type="date"
                name="to"
                value={dateRange.to}
                onChange={(e) =>
                  setDateRange({ ...dateRange, to: e.target.value })
                }
              />
            </Grid>

            {/* track */}
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="filter-sector-label">Track</InputLabel>
                <Select
                  value={filter.sector || ""}
                  labelId="filter-sector-label"
                  label="Sector"
                  onChange={(e) =>
                    setFilter({ ...filter, sector: e.target.value })
                  }
                >
                  <MenuItem value="mern">MERN</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button variant="contained" color="primary" onClick={handleFilter}>
              Apply Filters
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Delete confirmation Modal */}
      <Modal
        open={isDeleteModal}
        onClose={() => setIsDeleteModal(false)}
        aria-labelledby="filter-modal-title"
        aria-describedby="filter-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "70%", sm: "50%", md: "25%" },
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography
            id="filter-modal-title"
            variant="h6"
            component="h2"
            marginBottom={3}
          >
            Are you sure you want to delete this Post?
          </Typography>
          <Button
            onClick={() => setIsDeleteModal(false)}
            sx={{ bgcolor: "gray", color: "white", marginRight: "10px" }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(deleteId)}
            sx={{ bgcolor: "red", color: "white" }}
          >
            Delete
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Assignments;
