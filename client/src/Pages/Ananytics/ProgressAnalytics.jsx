import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllswlas } from "../../Redux/analytics/analytics.action";
import { GetAllLectures } from "../../Redux/lectures/lecture.action";
import { GetAllAssignments } from "../../Redux/assignment/assignment.action";

const ProgressAnalytics = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();

  // const { profile } = useSelector((state) => state.loginReducer);
  const { AllLectures } = useSelector((state) => state.LectureReducer);
  const { AllAssignments } = useSelector((state) => state.AssignmentReducer);
  const { Allswla } = useSelector((state) => state.AnalyticsReducer);

  useEffect(() => {
    // window.scrollTo(0, 0);
    dispatch(GetAllLectures({}));
    dispatch(GetAllAssignments({}));
    dispatch(GetAllswlas({}));
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(() => newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        mx: "auto",
        mt: 6,
        px: 2,
      }}
    >
      {/* Top Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              p: 2,
              textAlign: "center",
              boxShadow: 3,
              borderRadius: 3,
              backgroundColor: "#f9f9f9",
            }}
          >
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Total Lectures
              </Typography>
              <Typography variant="h4" fontWeight="bold" mt={1}>
                {AllLectures?.total || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              p: 2,
              textAlign: "center",
              boxShadow: 3,
              borderRadius: 3,
              backgroundColor: "#f9f9f9",
            }}
          >
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Total Assignments
              </Typography>
              <Typography variant="h4" fontWeight="bold" mt={1}>
                {AllAssignments?.total || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Divider */}
      <Divider sx={{ my: 5 }} />

      {/* Student Wise Progress */}
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Student Wise Progress
      </Typography>

      {/* Students List */}
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
              <TableCell sx={{ color: "white" }}>Assignment Count</TableCell>
              <TableCell sx={{ color: "white" }}>Lecture Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Allswla?.length === 0 ? (
              <TableRow sx={{ textAlign: "center" }}>
                No data available
              </TableRow>
            ) : (
              Allswla?.map((student, i) => (
                <TableRow
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: `${i % 2 === 0 ? "#c9d4e7" : "white"}`,
                  }}
                  key={student?._id}
                >
                  <TableCell>
                    <Typography>{student?.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{student?.assignmentCount}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{student?.lectureCount}</Typography>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50, 100]}
            // component="div"
            count={Allswla?.total || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProgressAnalytics;
