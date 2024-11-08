import React from 'react';
import Navbar from '@features/navbar/Navbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Mint
        </Typography>
        <Typography variant="body1">
          This is a basic landing page.

          - needs content, capture interest with an image, and prompt to view well-being support for companies
        </Typography>
      </Box>
    </div>
  );
};

export default LandingPage;