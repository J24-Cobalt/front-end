import { NavLink } from "react-router-dom";

import LogoutIcon from "@mui/icons-material/Logout";
import {
  Avatar,
  Box,
  ButtonBase,
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

interface Props {
  onClose: () => void;
  isMinimized?: boolean;
}

export default function AccountSidebar({ isMinimized, onClose }: Props) {
  //const user = useAppSelector(selectUser);
  //const userInitial = user?.displayName?.split(" ")[0][0];

  const onLinkClick = () => {
    onClose();
  };

  /*const onLogout = () => {
    logout();
  };*/

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
        <Box mb={6} alignItems={"center"} justifyContent="center">
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
        <Stack
          direction="row"
          alignItems="center"
          mb={4}
          gap={3}
          justifyContent={isMinimized ? "center" : "flex-start"}
        >
          <Avatar sx={{ height: 48, width: 48, background: Colors.disabled }}>
            {/*userInitial*/}
          </Avatar>
          {!isMinimized && <Typography variant="body1">Sebastian</Typography>}
        </Stack>
        <List>
          {ACCOUNT_LINKS.map(({ Icon, text, path }) => (
            <ListItem key={text} disablePadding>
              <NavLink
                to={path}
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
                        {text}
                      </Typography>
                    )}
                  </ListItemButton>
                )}
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Box>
      <ButtonBase
        /*onClick={onLogout}*/
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
