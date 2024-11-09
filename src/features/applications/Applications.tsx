import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Avatar,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@app/store/store";
import { useNavigate } from "react-router-dom";
import { setSelectedCompany } from "@features/dataSlices/company/matchingCompanySlice";
import { HasMatched } from "@features/types";
import avatar1 from '../../assets/profile-avatars/user_icon_1.png';
import avatar2 from '../../assets/profile-avatars/user_icon_2.png';
import avatar3 from '../../assets/profile-avatars/user_icon_3.png';
import avatar4 from '../../assets/profile-avatars/user_icon_4.png';
import avatar5 from '../../assets/profile-avatars/user_icon_5.png';
import avatar6 from '../../assets/profile-avatars/user_icon_6.png';

export default function Applications() {
  const matchedCompanies = useSelector(
    (state: RootState) => state.auth.matchedCompanies ?? []
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

  const handleCardClick = (company: HasMatched) => {
    dispatch(setSelectedCompany(company));
    navigate("/company-profile");
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1400, margin: "auto", padding: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Matched Companies
      </Typography>
      <Stack spacing={3}>
        {matchedCompanies.length > 0 ? (
          matchedCompanies.map((company, index) => {
            const avatarIndex = index % avatars.length;
            const assignedAvatar = avatars[avatarIndex];
            return (
              <Card
                key={index}
                sx={{
                  cursor: "pointer",
                  "&:hover": { boxShadow: 6 },
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: "box-shadow 0.3s ease-in-out",
                }}
                onClick={() => handleCardClick(company)}
              >
                <CardContent>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Avatar
                      alt={company.name}
                      src={assignedAvatar}
                      sx={{ width: 64, height: 64 }}
                    >
                      {!company.logo && <BusinessIcon />}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {company.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {company.description}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Typography variant="body1" color="text.secondary">
            No matched companies to display.
          </Typography>
        )}
      </Stack>
    </Box>
  );
}