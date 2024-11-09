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
  CardContent,
  Button,
  Divider,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@app/store/store";

export default function CompanyProfile() {
  // Select the company data from Redux store
  const companyData = useSelector(
    (state: RootState) => state.auth.companyData?.data[0]
  );

  const sdtProfile = companyData?.sdt_profile || {};

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
          src={companyData?.logo || "/default-logo.png"}
          sx={{ width: 80, height: 80 }}
        />
        <Stack direction="column" spacing={0.5}>
          <Typography variant="h4" fontWeight="bold">
            {companyData?.name || "Company Name"}
          </Typography>
        </Stack>
      </Stack>

      {/* Stack of SDT Profile Ratings and Work Experience */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3} mb={4}>
        {/* SDT Profile Card with Rating */}
        <Card sx={{ flex: 2, maxHeight: 220, overflowY: "auto" }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              SDT Profile
            </Typography>
            {Object.entries(sdtProfile).map(([trait, value]) => (
              <Box
                key={trait}
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <Typography variant="body2" textAlign="center">
                  {trait
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </Typography>
                <Rating
                  value={Number(value)}
                  readOnly
                  max={5}
                  sx={{ paddingLeft: "5px" }}
                />
              </Box>
            ))}
          </CardContent>
        </Card>

        {/* Jobs Listing */}
        <Card sx={{ flex: 3, minHeight: 180 }}>
          <Box sx={{ padding: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Available Jobs
            </Typography>
            {companyData?.jobs && companyData.jobs.length > 0 ? (
              <List>
                {companyData.jobs.map((job, index) => (
                  <>
                    <Box
                      mb={2}
                      display="flex"
                      alignItems="flex-start"
                      justifyContent="space-between"
                    >
                      <Box flex={1}>
                        <ListItem disablePadding>
                          <ListItemText
                            primary={job.title}
                            secondary={job.location}
                            primaryTypographyProps={{ fontWeight: "bold" }}
                          />
                        </ListItem>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          mt={1}
                        >
                          {job.description}
                        </Typography>
                      </Box>
                      <Stack
                        direction="column"
                        spacing={1}
                        alignItems="flex-end"
                      >
                        <Button
                          variant="outlined"
                          color="primary"
                          sx={{ width: 160 }}
                        >
                          Find Candidates
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ width: 160 }}
                        >
                          See Applicants
                        </Button>
                      </Stack>
                    </Box>
                    {index < companyData.jobs.length - 1 && (
                      <Divider sx={{ my: 2 }} /> // Add divider between jobs
                    )}
                  </>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No available jobs listed.
              </Typography>
            )}
          </Box>
        </Card>
      </Stack>
    </Box>
  );
}
