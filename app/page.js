// app/page.js
'use client';

import { Box, Typography, Button, Container } from '@mui/material';
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
      textAlign: 'center',
      textTransform: 'uppercase',
      letterSpacing: 1.5
    }}>
      Welcome to Your Personal Pantry Manager
    </Typography>
    <Typography variant="body1" sx={{
      marginBottom: 4,
      color: 'darkblue',
      textAlign: 'center',
      fontSize: '1.8rem',
      fontWeight: 300
    }}>
      Manage Your Inventory efficiently
    </Typography>

    <Typography variant="body1" sx={{
      marginBottom: 4,
      color: 'darkblue',
      textAlign: 'center',
      fontSize: '1.3rem',
      fontWeight: 300
      
    }}>
      Comes with Unique Features
      <Typography>
        AI Reciple Creator
        <br></br>
        Image Classifier
        <br></br>
        Custom Search Bar
      </Typography>
    </Typography>

    
      
    
      <Button
        variant="contained"
        sx={{
            color: 'white',
            backgroundColor: 'blue', // Green color for the button
            '&:hover': {
              backgroundColor: 'darkblue', // Darker green for hover effect
            },
          }}
        onClick={handleNavigate}
      >
        Get Started
      </Button>
    </Box>
  );
}