import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const ProgressAnalytics = () => {
  const { profile } = useSelector((state) => state.loginReducer);
  const { AllLectures } = useSelector((state) => state.LectureReducer);
  const { AllAssignments } = useSelector((state) => state.AssignmentReducer);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <Grid container spacing={2}>
        {profile?.students?.length > 0 ? (
          profile.students.map((student, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 2,
                  backgroundColor: "#ffffff",
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {student?.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {student?.email}
                </Typography>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No students available
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default ProgressAnalytics;
