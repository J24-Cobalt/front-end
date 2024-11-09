import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography, Modal, Grow } from "@mui/material";
import { RootState, AppDispatch } from "@app/store/store";
import { login } from "@features/dataSlices/auth/authSlice";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const style = {
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 8,
};

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const authError = useSelector((state: RootState) => state.auth.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(login({ email, password }));
    if (!authError) onClose();
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Grow in={open}>
        <Box sx={style}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ textAlign: "center", mb: 2 }}
          >
            Login
          </Typography>
          {authError && (
            <Typography color="error" sx={{ mb: 2, textAlign: "center" }}>
              {authError}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
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
              Login
            </Button>
          </form>
        </Box>
      </Grow>
    </Modal>
  );
};

export default LoginModal;
