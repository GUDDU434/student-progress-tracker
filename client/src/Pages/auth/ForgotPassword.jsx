import React, { useState } from "react";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    if (email === "") {
      setError("Please enter your email");
      return;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError(""); // Clear any previous error
    // Send email logic
    // console.log("Send email to:", email);
    navigate("/verify-email");
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" gutterBottom>
          Forgot Password
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleForgotPassword}
          sx={{ mt: 2 }}
        >
          Send Verification Email
        </Button>
        <Typography variant="body2" color="textSecondary" mt={2}>
          <Link to="/">Go to Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
