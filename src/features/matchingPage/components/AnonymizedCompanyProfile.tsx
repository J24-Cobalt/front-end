import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  Rating,
} from "@mui/material";

interface CompanyProfile {
  sdt_profile: {
    autonomy_support: number;
    competence_support: number;
    relatedness_support: number;
    growth_and_personal_alignment: number;
  };
  title: string;
  description: string;
}

export default function AnonymizedCompanyProfile({
  profile,
}: {
  profile: CompanyProfile;
}) {
  return (
    <Box
      sx={{
        width: "100%",
        padding: 4,
        borderRadius: "15px",
        border: "1px solid lightgrey",
      }}
    >
      {/* Job Title and Description */}
      <Stack spacing={1} mb={4} direction="column" alignItems="center">
        <Typography variant="h4" fontWeight="bold">
          {profile.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {profile.description}
        </Typography>
      </Stack>

      {/* SDT Profile Ratings and Video Player */}
      <Stack direction="row" spacing={3} mb={4}>
        {/* SDT Profile Card */}
        <Card sx={{ flex: 1, minHeight: 100 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              SDT Profile
            </Typography>
            {Object.entries(profile.sdt_profile).map(([trait, value]) => (
              <Stack
                key={trait}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Typography variant="body2" color="text.secondary">
                  {trait
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                  :
                </Typography>
                <Rating value={value} readOnly max={5} />
              </Stack>
            ))}
          </CardContent>
        </Card>

        {/* Mock Video Player */}
        <Card sx={{ flex: 1.5 }} style={{ padding: 0 }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 300,
                maxHeight: 300,
                bgcolor: "black",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Play Button */}
              <Box
                sx={{
                  width: 75,
                  height: 64,
                  bgcolor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <Typography
                  variant="h4"
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
                    bgcolor: "rgba(255, 255, 255, 0.3)",
                    borderRadius: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: "30%",
                      height: "100%",
                      bgcolor: "white",
                      borderRadius: 1,
                    }}
                  />
                </Box>

                {/* Timestamps */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mt: 0.5, px: 0.5, color: "white", fontSize: 12 }}
                >
                  <Typography>0:47</Typography>
                  <Typography>2:45</Typography>
                </Stack>
              </Box>
            </Box>
        </Card>
      </Stack>
    </Box>
  );
}
