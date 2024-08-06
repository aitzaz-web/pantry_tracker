import { Inter } from 'next/font/google';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import Link from 'next/link';
import './globals.css'; // Ensure globals.css exists and is correctly configured



// Apply font styles if needed
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Pantry Tracker',
  description: 'Track and manage your pantry items efficiently.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
      
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Pantry Tracker
            </Typography>
            <Button color="inherit">
              <Link href="/">About</Link>
            </Button>
            <Button color="inherit">
              <Link href="/inventory">Pantry</Link>
            </Button>
            
          </Toolbar>
        </AppBar>
        <Container component="main" style={{ marginTop: '2rem', paddingBottom: '2rem' }}>
          {children}
        </Container>
        <Box component="footer" style={{ padding: '1rem', textAlign: 'center', marginTop: 'auto' }}>
          <Typography variant="body2" color="textSecondary">
            &copy; {new Date().getFullYear()} Pantry Tracker. All rights reserved.
          </Typography>
        </Box>
        
      </body>
      
    </html>
  );
}
