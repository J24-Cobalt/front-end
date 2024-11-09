import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  ThemeProvider,
  Chip,
} from '@mui/material';
import Navbar from '@features/navbar/Navbar';
import {
  ShieldOutlined,
  FavoriteOutlined,
  GroupsOutlined,
  AutoAwesomeOutlined,
  ArrowForwardOutlined,
} from '@mui/icons-material';
import theme from '../../app/styles/theme';
import AppButton from '../ui/AppButton';

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
          borderRadius: '50%',
          bgcolor: 'primary.light',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
        }}
      >
        <Icon sx={{ color: 'white' }} />
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
      title: 'Anonymity First',
      description: 'Your identity remains private until you choose to reveal it.',
    },
    {
      icon: FavoriteOutlined,
      title: 'Well-being Focus',
      description: 'Find companies that prioritize mental health.',
    },
    {
      icon: GroupsOutlined,
      title: 'Values Match',
      description: 'Connect with organizations that share your values.',
    },
    {
      icon: AutoAwesomeOutlined,
      title: 'Perfect Match',
      description: 'AI-powered matching based on shared principles.',
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Box
        sx={{
          minHeight: '100vh',
          background: `linear-gradient(360deg, ${theme.palette.primary.main}, white)`,
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Main background blur circle */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '800px',
            background: `radial-gradient(circle, ${theme.palette.primary.light}40, transparent)`,
            filter: 'blur(100px)',
            zIndex: 0,
          }}
        />

        {/* Secondary background circle */}
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            right: '10%',
            width: '400px',
            height: '400px',
            background: `radial-gradient(circle, ${theme.palette.primary.light}30, transparent)`,
            filter: 'blur(70px)',
            zIndex: 0,
          }}
        />

        {/* Third background circle */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            left: '5%',
            width: '300px',
            height: '300px',
            background: `radial-gradient(circle, ${theme.palette.primary.light}20, transparent)`,
            filter: 'blur(60px)',
            zIndex: 0,
          }}
        />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4}>
            {/* Left Column - Hero Content */}
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Chip
                  icon={<AutoAwesomeOutlined />}
                  label="Anonymous Matching Platform"
                  sx={{
                    bgcolor: `${theme.palette.primary.light}30`,
                    color: theme.palette.primary.dark,
                    mb: 3,
                  }}
                />
              </Box>

              <Typography variant="h1" gutterBottom>
                Where <Box component="span" sx={{ color: 'primary.main' }}>well-being</Box>
                <br />shapes your career
              </Typography>

              <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
                Connect with companies that share your values and prioritize work-life balance.
              </Typography>

              <Box sx={{ mb: 6, display: 'flex', gap: 2 }}>
                <AppButton
                  variant="outlined"
                  color="primary"
                  endIcon={<ArrowForwardOutlined />}
                  sx={{
                    bgcolor: 'white',
                    color: theme.palette.primary.main,
                    borderColor: theme.palette.primary.main,
                  }}
                >
                  Match Now
                </AppButton>
                
                <AppButton
                  variant="outlined"
                  color="primary"
                  sx={{
                    bgcolor: 'black',
                    color: `rgba(${theme.palette.primary.main}, 0.8)`,
                    borderColor: 'black',
                  }}
                >
                  For Companies
                </AppButton>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Trusted by:
                </Typography>
                <Grid container spacing={2} sx={{ maxWidth: 300 }}>
                  {[1, 2, 3].map((i) => (
                    <Grid item key={i} xs={4}>
                      <Box sx={{ height: 24, bgcolor: 'grey.200', borderRadius: 1, opacity: 0.5 }} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
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