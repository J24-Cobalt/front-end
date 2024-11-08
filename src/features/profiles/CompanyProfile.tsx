import {
  Box,
  Typography,
  Stack,
  Card,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Rating,
} from "@mui/material";

export default function CompanyProfile() {
  const compatibilityData = [
    { name: "Adaptability", rating: 4 },
    { name: "Teamwork", rating: 5 },
    { name: "Problem-solving", rating: 3 },
    { name: "Leadership", rating: 4 },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1400,
        margin: "auto",
        padding: 4,
      }}
    >
      {/* Header with Avatar, Company Name, and Description */}
      <Stack direction="row" spacing={2} alignItems="center" mb={4}>
        <Avatar
          alt="Company Logo"
          src="/path/to/logo.jpg" // Replace with actual logo path
          sx={{ width: 80, height: 80 }}
        />
        <Stack direction="column" spacing={0.5}>
          <Typography variant="h4" fontWeight="bold">
            Tech Innovators Inc.
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Leading innovations in software solutions across multiple
            industries.
          </Typography>
        </Stack>
      </Stack>

      {/* Mental Compatibility and Video Placeholder */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3} mb={4}>
        {/* Mental Compatibility Card */}
        <Card sx={{ flex: 1, minHeight: 180 }}>
          <Box sx={{ padding: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Mental Compatibility
            </Typography>
            <List>
              {compatibilityData.map((trait) => (
                <ListItem key={trait.name} disablePadding>
                  <ListItemText primary={trait.name} />
                  <Rating value={trait.rating} readOnly />
                </ListItem>
              ))}
            </List>
          </Box>
        </Card>

        {/* Video Player Placeholder */}
        <Card sx={{ flex: 2, minHeight: 180 }}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              backgroundColor: "black",
              borderRadius: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Play Button */}
            <Box
              sx={{
                width: 64,
                height: 64,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Typography
                variant="h3"
                color="black"
                sx={{ fontWeight: "bold" }}
              >
                ▶
              </Typography>
            </Box>

            {/* Mock Progress Bar */}
            <Box
              sx={{
                position: "absolute",
                bottom: 16,
                width: "90%",
                mx: "auto",
              }}
            >
              <Box
                sx={{
                  height: 8,
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  borderRadius: 1,
                }}
              >
                <Box
                  sx={{
                    width: "30%",
                    height: "100%",
                    backgroundColor: "white",
                    borderRadius: 1,
                  }}
                />
              </Box>

              {/* Timestamps */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "white",
                  fontSize: 12,
                  mt: 0.5,
                  px: 0.5,
                }}
              >
                <Typography>0:00</Typography>
                <Typography>2:45</Typography>
              </Box>
            </Box>
          </Box>
        </Card>
      </Stack>
    </Box>
  );
}
