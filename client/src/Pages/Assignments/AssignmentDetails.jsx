import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetSinglelecture } from "../../Redux/lectures/lecture.action";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Input,
  Button,
} from "@mui/material";
import {
  GetAllAssignments,
  GetSingleassignment,
} from "../../Redux/assignment/assignment.action";
import { formatDate } from "../../utils/common_func";

const AssignmentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { assignmentDetails, isLoading, isError } = useSelector(
    (state) => state.AssignmentReducer
  );

  const { profile } = useSelector((state) => state.loginReducer);

  useEffect(() => {
    dispatch(GetSingleassignment(id));
  }, [dispatch, id]);

  return (
    <Box
      sx={{
        maxWidth: "800px",
        mx: "auto",
        mt: 6,
        px: 2,
      }}
    >
      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Typography color="error" textAlign="center" mt={4}>
          {isError.message || "Something went wrong"}
        </Typography>
      ) : (
        <Card
          sx={{
            p: 3,
            boxShadow: 3,
            borderRadius: 3,
            backgroundColor: "#fafafa",
          }}
        >
          <CardContent>
            <Typography variant="h4" fontWeight="bold" mb={2} color="primary">
              {assignmentDetails?.title} -{" "}
              <Typography
                variant="span"
                color="textSecondary"
                fontWeight="normal"
                fontSize={16}
              >
                {assignmentDetails?.status?.toUpperCase()}
              </Typography>
            </Typography>

            <Typography variant="body1" color="textSecondary" mb={1}>
              Start: {formatDate(assignmentDetails?.start_date, false)} | Due
              Date:
              {formatDate(assignmentDetails?.due_date, false)}
            </Typography>

            <Typography variant="body1" color="textSecondary" mb={1}>
              Instuctor:" {assignmentDetails?.posted_by?.name}
            </Typography>

            <Typography variant="body1" color="textSecondary" mb={1}>
              {assignmentDetails?.description}
            </Typography>

            {profile?.role !== "Student" &&
              assignmentDetails?.students?.length > 0 && (
                <Box mt={4}>
                  <Typography variant="h6" mb={2}>
                    Students:
                  </Typography>
                  {assignmentDetails.students.map((student, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 2,
                        mb: 2,
                        backgroundColor: "#fff",
                        borderRadius: 2,
                        boxShadow: 1,
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="bold">
                        {student?.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {student?.email}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}

            <Box mt={4}>
              <Typography variant="h6" mb={2}>
                Submission Link:
              </Typography>
              <Input
                placeholder="Enter Submission Link"
                value={assignmentDetails?.submission_link}
                fullWidth
              />
              <Button variant="contained" color="primary" fullWidth mt={2}>
                Submit
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default AssignmentDetails;
