import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  type CSSObject,
  Drawer,
  type Theme,
  Toolbar,
  styled,
} from "@mui/material";

import { theme } from "@app/styles";
import AppIconButton from "@features/ui/AppIconButton";

import AccountSidebar from "./AccountSidebar";

const DESKTOP_DRAWER_WIDTH = 288;
const DESKTOP_MINIMIZED_DRAWER_WIDTH = 94;

const openedMixin = (theme: Theme): CSSObject => ({
  width: DESKTOP_DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: DESKTOP_MINIMIZED_DRAWER_WIDTH,
});

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: DESKTOP_DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const TOOLBAR_STYLES = { mt: 2, mb: 1 };

export default function AccountLayout() {
  const location = useLocation();
  const [isOpen, setOpen] = useState(true);

  const closeDrawer = () => {
    setOpen(false);
  };

  const handleDrawerToggle = () => {
    setOpen(!isOpen);
  };

  // This call is needed to cause re-render when you change
  // the url, so error boundary from another page also re-renders
  // and doesn't show old error from previous page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Box sx={{ display: "flex", bgcolor: "grey.100", minHeight: "100vh" }}>
        <>
          <StyledDrawer variant="permanent" open={isOpen}>
            <AccountSidebar onClose={closeDrawer} isMinimized={!isOpen} />
          </StyledDrawer>
          <AppIconButton
            isSmall
            aria-label="sidebar toggle button"
            onClick={handleDrawerToggle}
            sx={{
              borderRadius: 1,
              position: "fixed",
              top: 27,
              left: `calc(${
                isOpen ? DESKTOP_DRAWER_WIDTH : DESKTOP_MINIMIZED_DRAWER_WIDTH
              }px - 17px)`,
              background: "white",
              zIndex: theme.zIndex.drawer + 1,
              transition: theme.transitions.create("left", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              ":hover": {
                background: "white",
              },
            }}
          >
            {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </AppIconButton>
        </>
      <Box
        component="main"
        sx={{
          width: "100%",
          bgcolor: "grey.100",
          minHeight: "100vh",
          height: "auto",
          maxHeight: "auto",
          px: {
            xs: 2,
            md: 7,
          },
          pt: {
            xs: 0,
            md: 4,
          },
          pb: 4,
        }}
      >
        <Toolbar sx={{ display: "none", ...TOOLBAR_STYLES }} />
          <Outlet />
      </Box>
    </Box>
  );
}
