import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Container } from '@mui/material';
import Map from './Map';


const SharedMemories = () => {
    const { ids } = useParams();
    const [memories, setMemories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Here you would fetch the shared memories from your backend
        // For now, we'll simulate it with localStorage
        const fetchSharedMemories = () => {
            try {
                const allMemories = JSON.parse(localStorage.getItem('memories') || '[]');
                const sharedIds = ids.split(',');
                const sharedMemories = allMemories.filter(memory => sharedIds.includes(memory.id.toString()));
                setMemories(sharedMemories);
            } catch (err) {
                setError('Failed to load shared memories');
            } finally {
                setLoading(false);
            }
        };

        fetchSharedMemories();
    }, [ids]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container>
                <Typography color="error" align="center">
                    {error}
                </Typography>
            </Container>
        );
    }

    return (
        <Box>
            <Typography variant="h4" align="center" gutterBottom sx={{ pt: 2 }}>
                Shared Memories
            </Typography>
            <Box sx={{ height: 'calc(100vh - 100px)' }}>
                <Map memories={memories} readOnly={true} />
            </Box>
        </Box>
    );
};

export default SharedMemories;
