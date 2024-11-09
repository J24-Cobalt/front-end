import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { matchedUser } from "@features/matchingPage/data";

// This is for companies. List of applicants that are interested in your job.
export default function Applicants() {
  const handleCardClick = (id: number) => {
    // Replace with your navigation logic or modal pop-up
    console.log(`Card with ID ${id} clicked.`);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1400,
        margin: "auto",
        padding: 4,
      }}
    >
      <Stack spacing={3}>
        {matchedUser.map((application) => (
          <Card
            key={application.id}
            sx={{
              cursor: "pointer",
              "&:hover": { boxShadow: 4 },
            }}
            onClick={() => handleCardClick(application.id)}
          >
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <PersonIcon />
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {application.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {application.experience}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};