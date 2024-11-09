import {
  Box,
  Typography,
  Stack,
  Card,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  Rating,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@app/store/store";

export default function CompanyProfile() {
  const companyData = useSelector(
    (state: RootState) => state.company.selectedCompany
  );

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1400,
        margin: "auto",
        padding: 4,
      }}
    >
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

      <Stack direction={{ xs: "column", md: "row" }} spacing={3} mb={4}>
        <Card sx={{ flex: 1.5, minHeight: 180 }}>
          <Box sx={{ padding: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Culture Metrics
            </Typography>
            <List>
              {companyData?.sdt_profile
                ? Object.entries(companyData.sdt_profile).map(
                    ([trait, value]) => (
                      <Box
                        key={trait}
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <Typography variant="body2" textAlign="center">
                          {/* Remove underscores and capitalize words */}
                          {trait
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (c) => c.toUpperCase())}
                        </Typography>
                        <Rating value={Number(value)} readOnly max={5} sx={{paddingLeft: 1}}/>
                      </Box>
                    )
                  )
                : "No culture metrics available."}
            </List>
          </Box>
        </Card>

        <Card sx={{ flex: 2, minHeight: 180 }}>
          <Box sx={{ padding: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Available Jobs
            </Typography>
            {companyData?.jobs && companyData.jobs.length > 0 ? (
              <List>
                {companyData.jobs.map((job, index) => (
                  <Box key={index} mb={2}>
                    <ListItem disablePadding>
                      <ListItemText
                        primary={job.title}
                        secondary={job.location}
                        primaryTypographyProps={{ fontWeight: "bold" }}
                      />
                    </ListItem>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      {job.description}
                    </Typography>
                    {index < companyData.jobs.length - 1 && (
                      <Divider sx={{ my: 1 }} />
                    )}
                  </Box>
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
