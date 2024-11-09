import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography, Modal, Grow } from "@mui/material";
import { RootState, AppDispatch } from "@app/store/store";
import { login } from "@features/dataSlices/auth/authSlice";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const style = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 8,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "1px solid #ccc",
  outline: "none",
  fontSize: "16px",
  boxSizing: "border-box",
};

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const authError = useSelector((state: RootState) => state.auth.error);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Close the modal and navigate after login if authenticated
    if (isAuthenticated && open) {
      onClose();
      navigate("/matching");
    }
  }, [isAuthenticated, open, navigate, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
                style={inputStyle}
              />
            </Box>
            <Box>
              <Typography>Password</Typography>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
              />
            </Box>
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
          </form>
        </Box>
      </Grow>
    </Modal>
  );
};

export default LoginModal;
