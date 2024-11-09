import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  ThemeProvider,
  createTheme,
  Chip,
} from "@mui/material";
import Navbar from "@features/navbar/Navbar";
import {
  ShieldOutlined,
  FavoriteOutlined,
  GroupsOutlined,
  AutoAwesomeOutlined,
  ArrowForwardOutlined,
} from "@mui/icons-material";

// Create a custom theme with mint colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#34d399", // emerald-400
      light: "#a7f3d0", // emerald-200
      dark: "#059669", // emerald-600
    },
    background: {
      default: "#f0fdf4", // emerald-50
    },
  },
  typography: {
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "10px 24px",
          textTransform: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
        },
      },
    },
  },
});

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <Card elevation={2}>
    <CardContent>
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          bgcolor: "primary.light",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <Icon sx={{ color: "primary.main" }} />
      </Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

const LandingPage = () => {
  const features = [
    {
      icon: ShieldOutlined,
      title: "Anonymous First",
      description:
        "Your identity remains private until you choose to reveal it.",
    },
    {
      icon: FavoriteOutlined,
      title: "Well-being Focus",
      description: "Find companies that prioritize mental health.",
    },
    {
      icon: GroupsOutlined,
      title: "Values Match",
      description: "Connect with organizations that share your values.",
    },
    {
      icon: AutoAwesomeOutlined,
      title: "Perfect Match",
      description: "AI-powered matching based on shared principles.",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          background: `linear-gradient(135deg, ${theme.palette.background.default}, white)`,
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background blur circle */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            height: "800px",
            background: `radial-gradient(circle, ${theme.palette.primary.light}40, transparent)`,
            filter: "blur(100px)",
            zIndex: 0,
          }}
        />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={4}>
            {/* Left Column - Hero Content */}
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Chip
                  icon={<AutoAwesomeOutlined />}
                  label="Anonymous Matching Platform"
                  sx={{
                    bgcolor: "primary.light",
                    color: "primary.dark",
                    mb: 3,
                  }}
                />
              </Box>

              <Typography variant="h1" gutterBottom>
                Where{" "}
                <Box component="span" sx={{ color: "primary.main" }}>
                  well-being
                </Box>
                <br />
                shapes your career
              </Typography>

              <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
                Connect with companies that share your values and prioritize
                work-life balance.
              </Typography>

              <Box sx={{ mb: 6 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<ArrowForwardOutlined />}
                  sx={{ mr: 2 }}
                >
                  Match Now
                </Button>
                <Button variant="outlined" color="primary" size="large">
                  For Companies
                </Button>
              </Box>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}
              >
                <Typography variant="body2" color="text.secondary">
                  Trusted by:
                </Typography>
                <Grid container spacing={2} sx={{ maxWidth: 300 }}>
                  {[1, 2, 3].map((i) => (
                    <Grid item key={i} xs={4}>
                      <Box
                        sx={{
                          height: 24,
                          bgcolor: "grey.200",
                          borderRadius: 1,
                          opacity: 0.5,
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Company Buttons */}
              <Grid container spacing={2}>
                {[
                  "Medicare Systems",
                  "GreenTech Solutions",
                  "FutureTech Innovations",
                ].map((company, index) => (
                  <Grid item xs={4} key={index}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{
                        height: 60,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {company}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Right Column - Feature Cards */}
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                {features.map((feature, index) => (
                  <Grid item xs={6} key={index}>
                    <FeatureCard {...feature} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default LandingPage;
