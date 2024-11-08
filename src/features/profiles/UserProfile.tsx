import { Box, Typography, Stack, Card, CardContent, Avatar } from "@mui/material";

export default function UserProfile() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1400,
        margin: "auto",
        padding: 4,
      }}
    >
      {/* Profile Header with Avatar, Name, and Title */}
      <Stack direction="row" spacing={2} alignItems="center" mb={4}>
        <Avatar
          alt="John Doe"
          src="/path/to/avatar.jpg"
          sx={{ width: 80, height: 80 }}
        />
        <Stack direction="column" spacing={0.5}>
          <Typography variant="h4" fontWeight="bold">
            John Doe
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Senior Software Engineer
          </Typography>
        </Stack>
      </Stack>

      {/* Stack of Priority and Work Experience */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3} mb={4}>
        {/* Priorities Card */}
        <Card sx={{ flex: 1, minHeight: 180 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Priorities
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Deliver high-quality code, mentor team members, and improve
              software performance.
            </Typography>
          </CardContent>
        </Card>

        {/* Work Experience Card */}
        <Card sx={{ flex: 2, minHeight: 180 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Work Experience
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Over 8 years of experience in full-stack development, focusing on
              React, Node.js, and cloud solutions.
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* Stack of Skills and Education */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        {/* Skills Card */}
        <Card sx={{ flex: 1, minHeight: 180 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Skills
            </Typography>
            <Typography variant="body1" color="text.secondary">
              JavaScript, React, Node.js, TypeScript, AWS, Docker, GraphQL, and
              CI/CD practices.
            </Typography>
          </CardContent>
        </Card>

        {/* Education Card */}
        <Card sx={{ flex: 2, minHeight: 180 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Education
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Bachelor’s Degree in Computer Science from XYZ University, with a
              specialization in software engineering.
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
