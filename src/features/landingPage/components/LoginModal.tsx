import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Typography,
  Modal,
  Grow,
  Link,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { RootState, AppDispatch } from "@app/store/store";
import { login, loadUserData } from "@features/dataSlices/auth/authSlice";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onOpenSignup: () => void;
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

const LoginModal: React.FC<LoginModalProps> = ({
  open,
  onClose,
  onOpenSignup,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const authError = useSelector((state: RootState) => state.auth.error);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"applicant" | "company">(
    "applicant"
  );

  useEffect(() => {
    if (isAuthenticated && open) {
      onClose();
      navigate("/matching");
    }
  }, [isAuthenticated, open, navigate, onClose]);

  const handleLogin = async () => {
    const resultAction = await dispatch(login({ email, password, userType }));

    if (login.fulfilled.match(resultAction)) {
      const email = resultAction.payload.email;
      const userType = resultAction.payload.isCompany ? "company" : "applicant";
      dispatch(loadUserData({ email, userType }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin();
  };

  const handleUserTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newUserType: "applicant" | "company" | null
  ) => {
    if (newUserType !== null) {
      setUserType(newUserType);
      console.log(newUserType);
    }
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
            Log in to Mint
          </Typography>
          {authError && (
            <Typography color="error" sx={{ mb: 2, textAlign: "center" }}>
              {authError}
            </Typography>
          )}
          {/* User type toggle */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <ToggleButtonGroup
              value={userType}
              exclusive
              onChange={handleUserTypeChange}
              aria-label="login type"
            >
              <ToggleButton value="applicant" aria-label="user login">
                User
              </ToggleButton>
              <ToggleButton value="company" aria-label="company login">
                Company
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <form onSubmit={handleSubmit}>
            <Box>
              <Typography>Email</Typography>
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
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don’t have an account yet?{" "}
            <Link component="button" variant="body2" onClick={onOpenSignup}>
              Sign up for Mint
            </Link>
          </Typography>
        </Box>
      </Grow>
    </Modal>
  );
};

export default LoginModal;
