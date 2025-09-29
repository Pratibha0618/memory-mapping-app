import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    Box,
    Typography,
    Button,
    Container,
    Grid,
    Card,
    CardContent,
    Fade
} from '@mui/material';
import {
    LocationOn as LocationIcon,
    Timeline as TimelineIcon,
    Share as ShareIcon,
    ArrowForward as ArrowIcon
} from '@mui/icons-material';

const LandingPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleGetStarted = () => {
        if (user) {
            // If user is already logged in, navigate directly to map
            navigate('/map');
        } else {
            // If user is not logged in, navigate to login page
            navigate('/login');
        }
    };

    return (
        <Box sx={{ minHeight: '100vh' }}>
            {/* Hero Section */}
            <Box sx={{
                background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                color: 'white',
                py: 12,
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <Container maxWidth="md">
                    <Fade in timeout={1000}>
                        <Box>
                            <Typography variant="h2" component="h1" sx={{ 
                                fontWeight: 'bold', 
                                mb: 3,
                                fontSize: { xs: '2.5rem', md: '3.5rem' }
                            }}>
                                Memory Map
                            </Typography>
                            <Typography variant="h5" sx={{ 
                                mb: 4, 
                                opacity: 0.9,
                                lineHeight: 1.6,
                                fontSize: { xs: '1.1rem', md: '1.3rem' }
                            }}>
                                Create a beautiful visual journey of your life experiences. 
                                Pin your memories to places and watch your personal story unfold on the map.
                            </Typography>
                            <Button
                                onClick={handleGetStarted}
                                variant="contained"
                                size="large"
                                endIcon={<ArrowIcon />}
                                sx={{
                                    backgroundColor: 'white',
                                    color: '#1976d2',
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: '25px',
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem',
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                                    }
                                }}
                            >
                                {user ? 'Continue Mapping' : 'Start Mapping Memories'}
                            </Button>
                        </Box>
                    </Fade>
                </Container>
            </Box>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ py: 10 }}>
                <Typography variant="h3" component="h2" sx={{
                    textAlign: 'center',
                    mb: 6,
                    fontWeight: 'bold',
                    color: '#333'
                }}>
                    Why Choose Memory Map?
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Fade in timeout={1200}>
                            <Card sx={{
                                height: '100%',
                                textAlign: 'center',
                                p: 3,
                                borderRadius: '16px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
                                }
                            }}>
                                <CardContent>
                                    <LocationIcon sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
                                    <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
                                        Pin Your Memories
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Drop pins on any location and add memories, stories, and dates to create lasting memory markers.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Fade>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Fade in timeout={1400}>
                            <Card sx={{
                                height: '100%',
                                textAlign: 'center',
                                p: 3,
                                borderRadius: '16px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
                                }
                            }}>
                                <CardContent>
                                    <TimelineIcon sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
                                    <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
                                        Timeline View
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        View your memories chronologically and see how your journey has evolved over time.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Fade>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Fade in timeout={1600}>
                            <Card sx={{
                                height: '100%',
                                textAlign: 'center',
                                p: 3,
                                borderRadius: '16px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
                                }
                            }}>
                                <CardContent>
                                    <ShareIcon sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
                                    <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
                                        Share Your Journey
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Share specific memories or your entire map with friends and family.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Fade>
                    </Grid>
                </Grid>
            </Container>

            {/* Footer */}
            <Box sx={{
                backgroundColor: '#1a1a1a',
                color: 'white',
                textAlign: 'center',
                py: 3,
                mt: 8
            }}>
                <Typography variant="body2">
                    © {new Date().getFullYear()} Memory Mapping. Create your personal journey today.
                </Typography>
            </Box>
        </Box>
    );
};

export default LandingPage;
