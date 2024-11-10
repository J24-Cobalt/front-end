import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  Avatar,
  Rating,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@app/store/store";
import userIcon2 from '../../assets/profile-avatars/user_icon_2.png';

export default function UserProfile() {
  const userData = useSelector(
    (state: RootState) => state.auth.userData?.data[0]
  );

  const avatarUrl = userData?.avatar || "/path/to/default-avatar.jpg";
  const fullName = userData?.fullname || "Unknown User";
  const intro = userData?.intro || "No introduction provided.";
  const sdtProfile = userData?.sdt_profile || {};
  const skills = userData?.skills?.join(", ") || "No skills listed";
  const educationList = userData?.education || [];
  const workExperienceList = userData?.work_experience || [];

  console.log(avatarUrl);

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
        <Avatar alt={fullName} src={userIcon2} sx={{ width: 80, height: 80 }} />
        <Stack direction="column" spacing={0.5}>
          <Typography variant="h4" fontWeight="bold">
            {fullName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {intro}
          </Typography>
        </Stack>
      </Stack>

      {/* Stack of SDT Profile Ratings and Work Experience */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3} mb={4}>
        {/* SDT Profile Card with Rating */}
        <Card
          sx={{ flex: 2.5, minHeight: 180, maxHeight: 250, overflowY: "auto" }}
        >
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
                  {/* Remove underscores and capitalize words */}
                  {trait
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </Typography>
                <Rating
                  value={Number(value)}
                  readOnly
                  max={5}
                  sx={{ paddingLeft: 1 }}
                />
              </Box>
            ))}
          </CardContent>
        </Card>

        {/* Work Experience Card */}
        <Card
          sx={{ flex: 3, minHeight: 180, maxHeight: 250, overflowY: "auto" }}
        >
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Work Experience
            </Typography>
            {workExperienceList.length > 0 ? (
              workExperienceList.map((experience, index) => (
                <Box key={index} mb={2}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {experience.position} at {experience.company}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {experience.start_date} to {experience.end_date}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" mt={1}>
                    {experience.description}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body1" color="text.secondary">
                No work experience listed.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Stack>

      {/* Stack of Skills and Education */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        {/* Skills Card */}
        <Card sx={{ flex: 1, minHeight: 200 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Skills
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {skills}
            </Typography>
          </CardContent>
        </Card>

        {/* Education Card */}
        <Card
          sx={{ flex: 2, minHeight: 200, maxHeight: 300, overflowY: "auto" }}
        >
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Education
            </Typography>
            {educationList.length > 0 ? (
              educationList.map((edu, index) => (
                <Box key={index} mb={2}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {edu.degree} from {edu.institution}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {edu.start_date} to {edu.end_date}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" mt={1}>
                    Score: {edu.score}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body1" color="text.secondary">
                No education details available.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
