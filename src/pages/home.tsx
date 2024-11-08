import Navbar from "@features/navbar/Navbar";
import { Box, Stack, Typography } from "@mui/material";

export default function homePage() {
  return (
    <Box>
      <Navbar />
      <Box>
        <Stack>
          <Typography>Mint is an app for ....</Typography>
        </Stack>
      </Box>
    </Box>
  );
}
