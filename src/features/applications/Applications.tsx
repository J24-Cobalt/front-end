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

export default function Applications() {
  const matchedCompanies = useSelector(
    (state: RootState) => state.auth.matchedCompanies ?? []
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          matchedCompanies.map((company, index) => (
            <Card
              key={index}
              sx={{ cursor: "pointer", "&:hover": { boxShadow: 4 } }}
              onClick={() => handleCardClick(company)}
            >
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    alt={company.name}
                    src={company.logo || ""}
                    sx={{ width: 56, height: 56 }}
                  >
                    {!company.logo && <BusinessIcon />}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {company.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {company.description}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            No matched companies to display.
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
