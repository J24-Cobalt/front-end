import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography, Modal, Grow } from "@mui/material";
import { RootState, AppDispatch } from "@app/store/store";
import { register } from "@features/dataSlices/auth/authSlice";

interface SignUpModalProps {
  open: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const authError = useSelector((state: RootState) => state.auth.error);

  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(register({ fullname, username, email, password }));
    if (!authError) onClose();
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Grow in={open}>
        <Box>
          <Typography
            variant="h6"
            component="h2"
            sx={{ textAlign: "center", mb: 2 }}
          >
            Sign Up
          </Typography>
          {authError && (
            <Typography color="error" sx={{ mb: 2, textAlign: "center" }}>
              {authError}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <Box>
              <Typography>Full Name</Typography>
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                style={{ width: "100%" }}
              />
            </Box>
            <Box>
              <Typography>Username</Typography>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: "100%" }}
              />
            </Box>
            <Box>
              <Typography>E-Mail</Typography>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%" }}
              />
            </Box>
            <Box>
              <Typography>Password</Typography>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%" }}
              />
            </Box>
            <Button type="submit" variant="contained" fullWidth>
              Sign Up
            </Button>
          </form>
        </Box>
      </Grow>
    </Modal>
  );
};

export default SignUpModal;