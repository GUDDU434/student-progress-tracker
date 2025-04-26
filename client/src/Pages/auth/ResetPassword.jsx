import React, { useState } from "react";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = () => {
    if (newPassword === "" || confirmPassword === "") {
      setError("Please fill in all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // Reset password logic
    // console.log("Reset password to:", newPassword);
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" gutterBottom>
          Reset Password
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleResetPassword}
          sx={{ mt: 2 }}
        >
          Reset Password
        </Button>
      </Box>
    </Container>
  );
};

export default ResetPassword;
