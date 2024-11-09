import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import { Colors } from "@app/styles";
import LoginModal from "@features/landingPage/components/LoginModal";
import SignupModal from "@features/landingPage/components/SignupModal";
import AppButton from "@features/ui/AppButton";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@app/store/store";
import mintLogo from '../../assets/mint-logo.png'; 

const pages = ["Home"];

export default function Navbar() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = Boolean(user);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  const openSignupModal = () => setSignupModalOpen(true);
  const closeSignupModal = () => setSignupModalOpen(false);

  // Function to open signup modal from login modal
  const toggleToSignup = () => {
    closeLoginModal();
    openSignupModal();
  };

  // Function to open login modal from signup modal
  const toggleToLogin = () => {
    closeSignupModal();
    openLoginModal();
  };

  return (
    <Box
      sx={{
        height: "80px",
        width: "100%",
        backgroundColor: Colors.secondaryBlack,
        px: 4,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ height: "100%" }}
      >
        {/* Logo and menu items */}
        <Stack direction="row" alignItems="center" spacing={2}>
        <img
            src={mintLogo}
            alt="Mint Logo"
            style={{
              display: "flex",
              color: "black",
              justifyContent: "center",
              alignItems: "center",
              width: '75px',
              height: '75px', 
            }}
          />
          <Typography
            variant="h4"
            component="a"
            href="#"
            sx={{
              color: "white",
              fontWeight: "bold",
              textDecoration: "none",
              mr: 2,
            }}
          >
            Mint
          </Typography>
        </Stack>

        {/* Authentication buttons or avatar */}
        <Stack direction="row" spacing={2}>
          {!isAuthenticated ? (
            <>
              <AppButton
                variant="contained"
                color="primary"
                onClick={openLoginModal}
                isSmall
                sx={{ px: 3 }}
              >
                Login
              </AppButton>
              <AppButton
                variant="outlined"
                color="primary"
                onClick={openSignupModal}
                isSmall
                sx={{ px: 3 }}
              >
                Sign Up
              </AppButton>
            </>
          ) : (
            <AppButton href="/profile" variant="text">
              <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
            </AppButton>
          )}
        </Stack>
      </Stack>

      {/* Pass the toggle functions as props */}
      <LoginModal
        open={loginModalOpen}
        onClose={closeLoginModal}
        onOpenSignup={toggleToSignup}
      />
      <SignupModal
        open={signupModalOpen}
        onClose={closeSignupModal}
        onOpenLogin={toggleToLogin}
      />
    </Box>
  );
}
