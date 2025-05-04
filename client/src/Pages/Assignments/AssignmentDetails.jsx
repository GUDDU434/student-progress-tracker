import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Input,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  GetSingleassignment,
  updateAssignments,
} from "../../Redux/assignment/assignment.action";
import { formatDate } from "../../utils/common_func";

const AssignmentDetails = () => {
  const [submissionLink, setSubmissionLink] = React.useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const { assignmentDetails, isLoading, isError } = useSelector(
    (state) => state.AssignmentReducer
  );

  const { profile } = useSelector((state) => state.loginReducer);

  useEffect(() => {
    dispatch(GetSingleassignment(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (assignmentDetails) {
      let students = assignmentDetails?.submitted_by?.find(
        (student) => student?.student_id === profile._id
      );

      setSubmissionLink(students?.submission_link || "");
    }
  }, [assignmentDetails, profile._id]);

  const submitAssignment = () => {
    let students = assignmentDetails?.submitted_by?.find(
      (student) => student?.student_id === profile._id.toString()
    );

    if (!students) {
      dispatch(
        updateAssignments(id, {
          submitted_by: [
            ...assignmentDetails.submitted_by,
            {
              student_id: profile._id,
              submission_link: submissionLink,
            },
          ],
        })
      );
    }
  };

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

            <Typography variant="body2" color="textSecondary" mb={1}>
              Start: {formatDate(assignmentDetails?.start_date, false)} | Due
              Date:
              {formatDate(assignmentDetails?.due_date, false)}
            </Typography>

            <Typography variant="body1" color="textSecondary" mb={1}>
              Instuctor:" {assignmentDetails?.posted_by?.name}
            </Typography>

            <Typography variant="body1" color="textSecondary" mb={1}>
              Description: {assignmentDetails?.description}
            </Typography>

            {profile?.role !== "student" &&
              assignmentDetails?.submitted_by?.length > 0 && (
                <Box mt={4}>
                  <Typography variant="h6" mb={2}>
                    Students:
                  </Typography>
                  {assignmentDetails.submitted_by?.map((student, index) => (
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
                        {index + 1} {student?.student_id?.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {student?.submission_link}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            {profile?.role === "student" && (
              <Box mt={4}>
                <Typography variant="h6" mb={2}>
                  Submission Link:
                </Typography>
                <Input
                  placeholder="Enter Submission Link"
                  value={submissionLink}
                  fullWidth
                  onChange={(e) => {
                    setSubmissionLink(e.target.value);
                  }}
                  disabled={new Date(assignmentDetails?.due_date) < new Date()}
                />
                {new Date(assignmentDetails?.due_date) > new Date() && (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => {
                      submitAssignment(id, submissionLink);
                    }}
                  >
                    Submit
                  </Button>
                )}
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default AssignmentDetails;
