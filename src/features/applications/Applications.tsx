import { Box, Card, CardContent, Typography, Stack } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const applications = [
  {
    id: 1,
    name: "Alice Johnson",
    description:
      "Front-end developer with 5 years of experience in React and Material UI.",
  },
  {
    id: 2,
    name: "Bob Smith",
    description:
      "Full-stack engineer skilled in Node.js, GraphQL, and TypeScript.",
  },
  {
    id: 3,
    name: "Charlie Davis",
    description:
      "Experienced UX/UI designer passionate about creating user-centric designs.",
  },
];

// This page is for users. The users applications.
export default function Applications() {
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
        {applications.map((application) => (
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
                    {application.description}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
