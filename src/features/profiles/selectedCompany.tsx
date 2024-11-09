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
        <Card sx={{ flex: 1, minHeight: 180 }}>
          <Box sx={{ padding: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Culture Metrics
            </Typography>
            <List>
              {companyData?.culture_metric
                ? Object.entries(companyData.culture_metric).map(
                    ([key, value]) => (
                      <ListItem key={key} disablePadding>
                        <ListItemText
                          primary={key}
                          secondary={value}
                          primaryTypographyProps={{ fontWeight: "bold" }}
                        />
                      </ListItem>
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
