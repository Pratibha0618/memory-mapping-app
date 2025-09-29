import React from 'react';
import { Button, Box } from '@mui/material';
import { Map as MapIcon, Timeline as TimelineIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const ViewToggle = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isMapView = location.pathname === '/map';

    return (
        <Box
            sx={{
                position: 'absolute',
                top: '10px',
                right: '180px',
                zIndex: 1000,
            }}
        >
            <Button
                variant="contained"
                startIcon={isMapView ? <TimelineIcon /> : <MapIcon />}
                onClick={() => navigate(isMapView ? '/timeline' : '/map')}
                sx={{
                    backgroundColor: '#1976d2',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#1565c0',
                    },
                }}
            >
                {isMapView ? 'Timeline View' : 'Map View'}
            </Button>
        </Box>
    );
};

export default ViewToggle;
