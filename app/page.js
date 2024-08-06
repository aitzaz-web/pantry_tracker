'use client';

import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/login'); // Navigate to the auth page for login/signup
  };

  return (
    <Box
      sx={{
        width: '100%',
        backgroundSize: 'cover',
        backgroundColor: 'lightblue',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 2,
        textAlign: 'center',
      }}
    >
      <Typography variant="h2" sx={{
        marginBottom: 2,
        fontWeight: 'bold',
        color: 'darkblue',
        textTransform: 'uppercase',
        letterSpacing: 1.5
      }}>
        Welcome to Your Personal Pantry Manager
      </Typography>

      <Typography variant="body1" sx={{
        marginBottom: 4,
        color: 'darkblue',
        fontSize: '1.8rem',
        fontWeight: 300
      }}>
        Manage Your Inventory efficiently
      </Typography>

      <Typography variant="body1" sx={{
        marginBottom: 4,
        color: 'darkblue',
        fontSize: '1.3rem',
        fontWeight: 300
      }}>
        Comes with Unique Features
      </Typography>

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body1" sx={{ color: 'darkblue', fontSize: '1rem', fontWeight: 300 }}>
          AI Reciple Creator
          <br />
          Image Classifier
          <br />
          Custom Search Bar
        </Typography>
      </Box>

      <Button
        variant="contained"
        sx={{
          color: 'white',
          backgroundColor: 'blue', // Blue color for the button
          '&:hover': {
            backgroundColor: 'darkblue', // Darker blue for hover effect
          },
        }}
        onClick={handleNavigate}
      >
        Get Started
      </Button>
    </Box>
  );
}
