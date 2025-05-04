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
} from "@mui/material";

const LectureDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { lectureDetails, isLoading, isError } = useSelector(
    (state) => state.LectureReducer
  );

  const { profile } = useSelector((state) => state.loginReducer);

  useEffect(() => {
    dispatch(GetSinglelecture(id));
  }, [dispatch, id]);

  console.log(
    new Date(lectureDetails?.lacture_date).getTime() + 1 * 60 * 60 * 1000 <
      new Date(),
    new Date(lectureDetails?.lacture_date).getTime() + 6 * 24 * 60 * 60 * 1000,
    new Date().getTime()
  );

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
              {lectureDetails?.lacture_title}
            </Typography>

            <Typography variant="body1" color="textSecondary" mb={1}>
              Date: {lectureDetails?.lacture_date}
            </Typography>

            <Typography variant="body1" color="textSecondary" mb={1}>
              Video Link:{" "}
              <a
                href={lectureDetails?.lacture_video_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {new Date(lectureDetails?.lacture_date).getTime() +
                  1 * 60 * 60 * 1000 <
                new Date()
                  ? "Watch Video"
                  : "Join"}
              </a>
            </Typography>

            <Typography variant="body1" color="textSecondary" mb={1}>
              Material Link:{" "}
              <a
                href={lectureDetails?.lacture_material_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Material
              </a>
            </Typography>

            <Typography variant="body1" color="textSecondary" mb={3}>
              Track: {lectureDetails?.track}
            </Typography>

            {profile?.role !== "Student" &&
              lectureDetails?.students?.length > 0 && (
                <Box mt={4}>
                  <Typography variant="h6" mb={2}>
                    Students: ({lectureDetails?.students?.length})
                  </Typography>
                  {lectureDetails.students.map((student, index) => (
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
                        {index + 1}. {student?.student_id?.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {student?.student_id?.email}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default LectureDetails;
