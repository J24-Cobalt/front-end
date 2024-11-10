import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Avatar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { matchedUser } from "@features/matchingPage/data";
import avatar1 from '../../assets/profile-avatars/user_icon_1.png';
import avatar2 from '../../assets/profile-avatars/user_icon_2.png';
import avatar3 from '../../assets/profile-avatars/user_icon_3.png';
import avatar4 from '../../assets/profile-avatars/user_icon_4.png';
import avatar5 from '../../assets/profile-avatars/user_icon_5.png';
import avatar6 from '../../assets/profile-avatars/user_icon_6.png';

export default function Applicants() {
  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

  const handleCardClick = (id: number) => {
    // Replace with your navigation logic or modal pop-up
    console.log(`Card with ID ${id} clicked.`);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1400, margin: "auto", padding: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Matched Applicants
      </Typography>
      <Stack spacing={3}>
        {matchedUser.length > 0 ? (
          matchedUser.map((applicant, index) => {
            const avatarIndex = index % avatars.length;
            const assignedAvatar = avatars[avatarIndex];
            return (
              <Card
                key={applicant.id}
                sx={{
                  cursor: "pointer",
                  "&:hover": { boxShadow: 6 },
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: "box-shadow 0.3s ease-in-out",
                }}
                onClick={() => handleCardClick(index)}
              >
                <CardContent>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Avatar
                      alt={applicant.name}
                      src={assignedAvatar}
                      sx={{ width: 64, height: 64 }}
                    >
                      {!assignedAvatar && <PersonIcon />}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {applicant.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {applicant.experience}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Typography variant="body1" color="text.secondary">
            No matched applicants to display.
          </Typography>
        )}
      </Stack>
    </Box>
  );
}