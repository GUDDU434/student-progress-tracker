import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" gutterBottom>
          Verify Your Email
        </Typography>
        <Typography>
          A verification link has been sent to your email. Please check your
          email and click on the link to reset your password.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => navigate("/")}
          sx={{ mt: 2 }}
        >
          Go to Login
        </Button>
      </Box>
    </Container>
  );
};

export default VerifyEmail;
