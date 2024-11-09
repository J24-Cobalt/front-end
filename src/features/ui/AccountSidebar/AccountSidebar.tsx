import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  ButtonBase,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
  Typography,
} from "@mui/material";
import { Colors, theme } from "@app/styles";
import AdbIcon from "@mui/icons-material/Adb";
import { ACCOUNT_LINKS } from "./data";
import { AppDispatch } from "@app/store/store"; // Ensure this is correctly set up
import { logout } from "@features/dataSlices/auth/authSlice"; // Import the logout action
import { useDispatch } from "react-redux";

interface Props {
  onClose: () => void;
  isMinimized?: boolean;
}

export default function AccountSidebar({ isMinimized, onClose }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const isCompany = false;

  const onLinkClick = () => {
    onClose();
  };

  const onLogout = () => {
    dispatch(logout());
    onClose(); // Optional: Close sidebar after logout
  };

  return (
    <Stack
      justifyContent="space-between"
      sx={{
        py: 3,
        px: 2,
        height: "100%",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 60,
            width: "100%",
            gap: 2.5,
          }}
        >
          <AdbIcon
            sx={{
              display: "flex",
              mr: 1,
              color: "black",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </Box>
        <List>
          {ACCOUNT_LINKS.map(({ Icon, text, path, divider }) => {
            const displayText =
              isCompany && text === "Applications" ? "Applicants" : text;
            const displayPath =
              isCompany && text === "/applications" ? "/applicants" : path;

            return (
              <div key={text}>
                <ListItem disablePadding>
                  <NavLink
                    to={displayPath}
                    style={{
                      width: "100%",
                      textDecoration: "none",
                    }}
                    onClick={onLinkClick}
                  >
                    {({ isActive }) => (
                      <ListItemButton
                        sx={{
                          background: isActive
                            ? Colors.secondaryGreen
                            : "transparent",
                          borderRadius: 2,
                          color: isActive
                            ? theme.palette.primary.main
                            : theme.palette.text.primary,
                          mb: 1,
                          px: isMinimized ? 1 : 2,
                          justifyContent: isMinimized ? "center" : "flex-start",
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: isMinimized ? "inherit" : 56,
                            color: isActive
                              ? theme.palette.primary.main
                              : theme.palette.text.secondary,
                          }}
                        >
                          <Icon fontSize="large" />
                        </ListItemIcon>
                        {!isMinimized && (
                          <Typography variant={isActive ? "body2" : "body1"}>
                            {displayText}
                          </Typography>
                        )}
                      </ListItemButton>
                    )}
                  </NavLink>
                </ListItem>
                {divider && <Divider sx={{ my: 1 }} />}
              </div>
            );
          })}
        </List>
      </Box>
      <ButtonBase
        onClick={onLogout}
        sx={{ height: 51, py: 1, px: 2, width: "fit-content", borderRadius: 2 }}
      >
        <LogoutIcon sx={{ color: "text.secondary", mr: isMinimized ? 0 : 4 }} />
        {!isMinimized && (
          <Typography component="span" variant="body1">
            Logout
          </Typography>
        )}
      </ButtonBase>
    </Stack>
  );
}
