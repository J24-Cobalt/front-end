import Navbar from "@features/navbar/Navbar";
import { Box } from "@mui/material";

export default function homePage() {
  return (
    <Box
      sx={{ mx: "auto", margin: "auto", width: "100%" }}
      justifyContent={"center"}
      alignContent={"center"}
    >
      <Navbar />
    </Box>
  );
}
