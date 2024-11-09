import { Box, Typography, Stack, Card, CardContent } from '@mui/material';

interface Profile {
  name: string;
  title: string;
  priorities: string;
  experience: string;
  skills: string;
  education: string;
}

export default function AnonymizedUserProfile({ profile }: { profile: Profile }) {
  return (
    <Box
      sx={{
        width: '100%',
        padding: 4,
        borderRadius: "15px",
        border: "1px solid lightgrey",
      }}
    >
      {/* Name and Title Stack */}
      <Stack spacing={1} mb={4} direction="column" alignItems="center">
        <Typography variant="h4" fontWeight="bold">
          {profile.title}
        </Typography>
      </Stack>

      {/* Stack of Priority and Work Experience */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} mb={4}>
        {/* Priorities Card */}
        <Card sx={{ flex: 1, minHeight: 120 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Priorities
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {profile.priorities}
            </Typography>
          </CardContent>
        </Card>

        {/* Work Experience Card */}
        <Card sx={{ flex: 2, minHeight: 100 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Work Experience
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {profile.experience}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* Stack of Skills and Education */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        {/* Skills Card */}
        <Card sx={{ flex: 1, minHeight: 120 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Skills
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {profile.skills}
            </Typography>
          </CardContent>
        </Card>

        {/* Education Card */}
        <Card sx={{ flex: 2, minHeight: 120 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Education
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {profile.education}
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}