// src/components/Timeline.js
/*import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Divider,
    Card,
    CardContent,
    CardMedia,
    IconButton
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Place as PlaceIcon
} from '@mui/icons-material';
import './Timeline.css';

const Timeline = ({ memories, onEditMemory, onDeleteMemory }) => {
    // Sort memories by date
    const sortedMemories = [...memories].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // Group memories by year and month
    const groupedMemories = sortedMemories.reduce((groups, memory) => {
        const date = new Date(memory.createdAt);
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'long' });

        if (!groups[year]) {
            groups[year] = {};
        }
        if (!groups[year][month]) {
            groups[year][month] = [];
        }
        groups[year][month].push(memory);
        return groups;
    }, {});

    return (
        <Box sx={{
            maxWidth: 800,
            margin: '20px auto',
            padding: '20px',
            overflowY: 'auto',
            height: 'calc(100vh - 100px)'
        }}>
            <Typography variant="h4" gutterBottom align="center">
                Your Memory Timeline
            </Typography>

            {Object.entries(groupedMemories).reverse().map(([year, months]) => (
                <Box key={year} sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{
                        backgroundColor: '#1976d2',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        mb: 2
                    }}>
                        {year}
                    </Typography>

                    {Object.entries(months).reverse().map(([month, monthMemories]) => (
                        <Box key={`${year}-${month}`} sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ mb: 2, color: '#666' }}>
                                {month}
                            </Typography>

                            {monthMemories.map((memory) => (
                                <Card key={memory.id} sx={{ mb: 2 }}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <Box>
                                                <Typography variant="h6">
                                                    {memory.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                    <PlaceIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'text-bottom' }} />
                                                    {memory.location}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {memory.description}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => onEditMemory(memory.id)}
                                                    sx={{ mr: 1 }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => onDeleteMemory(memory.id)}
                                                    color="error"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>

                                        {memory.image && (
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={memory.image}
                                                alt={memory.title}
                                                sx={{
                                                    mt: 2,
                                                    borderRadius: '4px',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        )}

                                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                            {new Date(memory.createdAt).toLocaleString()}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    ))}
                </Box>
            ))}

            {sortedMemories.length === 0 && (
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                        No memories added yet. Start creating your journey!
                    </Typography>
                </Paper>
            )}
        </Box>
    );
};

export default Timeline;
*/


import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Dialog,
    Chip,
    Avatar,
    Fade,
    Divider,
    Button
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Place as PlaceIcon,
    AccessTime as TimeIcon,
    PhotoCamera as PhotoIcon,
    ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './Timeline.css';
import ViewToggle from './ViewToggle';
import MemoryForm from './MemoryForm';

const Timeline = ({ memories, onEditMemory, onDeleteMemory }) => {
    const [editingMemory, setEditingMemory] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Sort memories by date
    const sortedMemories = [...memories].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // Group memories by year and month
    const groupedMemories = sortedMemories.reduce((groups, memory) => {
        const date = new Date(memory.createdAt);
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'long' });

        if (!groups[year]) {
            groups[year] = {};
        }
        if (!groups[year][month]) {
            groups[year][month] = [];
        }
        groups[year][month].push(memory);
        return groups;
    }, {});

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this memory?')) {
            onDeleteMemory(id);
        }
    };

    const handleEdit = (memory) => {
        setEditingMemory(memory);
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = (updatedMemory) => {
        onEditMemory(editingMemory.id, updatedMemory);
        setIsEditModalOpen(false);
        setEditingMemory(null);
    };

    const handleEditCancel = () => {
        setIsEditModalOpen(false);
        setEditingMemory(null);
    };

    const navigate = useNavigate();

    return (
        <Box sx={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            position: 'relative'
        }}>
            {/* Header */}
            <Box sx={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                p: 2
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: 800, margin: '0 auto' }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate('/map')}
                        sx={{ mr: 2 }}
                    >
                        Back to Map
                    </Button>
                    <Typography variant="h4" sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>
                        Memory Timeline
                    </Typography>
                </Box>
            </Box>

            <Box sx={{
                maxWidth: 800,
                margin: '0 auto',
                padding: '40px 20px',
                position: 'relative'
            }}>
                {/* Timeline Line */}
                <Box sx={{
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    bottom: 0,
                    width: '4px',
                    background: 'linear-gradient(to bottom, #1976d2, #42a5f5)',
                    transform: 'translateX(-50%)',
                    borderRadius: '2px',
                    boxShadow: '0 0 10px rgba(25, 118, 210, 0.3)'
                }} />
                {Object.entries(groupedMemories).reverse().map(([year, months], yearIndex) => (
                    <Fade in timeout={500 + yearIndex * 200} key={year}>
                        <Box sx={{ mb: 6, position: 'relative' }}>
                            {/* Year Badge */}
                            <Box sx={{
                                position: 'absolute',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                zIndex: 10
                            }}>
                                <Chip
                                    label={year}
                                    sx={{
                                        background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '1.1rem',
                                        px: 3,
                                        py: 1,
                                        boxShadow: '0 4px 20px rgba(25, 118, 210, 0.4)'
                                    }}
                                />
                            </Box>

                            {Object.entries(months).reverse().map(([month, monthMemories], monthIndex) => (
                                <Box key={`${year}-${month}`} sx={{ mt: 4 }}>
                                    {monthMemories.map((memory, memoryIndex) => {
                                        const isLeft = memoryIndex % 2 === 0;
                                        return (
                                            <Fade in timeout={800 + memoryIndex * 150} key={memory.id}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    justifyContent: isLeft ? 'flex-start' : 'flex-end',
                                                    mb: 4,
                                                    position: 'relative'
                                                }}>
                                                    {/* Timeline Node */}
                                                    <Avatar sx={{
                                                        position: 'absolute',
                                                        left: '50%',
                                                        transform: 'translateX(-50%)',
                                                        bgcolor: '#1976d2',
                                                        width: 24,
                                                        height: 24,
                                                        zIndex: 5,
                                                        border: '4px solid white',
                                                        boxShadow: '0 0 0 4px rgba(25, 118, 210, 0.2)'
                                                    }}>
                                                        <PhotoIcon sx={{ fontSize: 12 }} />
                                                    </Avatar>

                                                    <Card sx={{
                                                        width: '45%',
                                                        background: 'rgba(255, 255, 255, 0.95)',
                                                        backdropFilter: 'blur(10px)',
                                                        borderRadius: '16px',
                                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                                        transition: 'all 0.3s ease',
                                                        '&:hover': {
                                                            transform: 'translateY(-4px)',
                                                            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
                                                        }
                                                    }}>
                                                        <CardContent sx={{ p: 3 }}>
                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                                                    {memory.title}
                                                                </Typography>
                                                                <Box>
                                                                    <IconButton
                                                                        size="small"
                                                                        onClick={() => handleEdit(memory)}
                                                                        sx={{ mr: 1, color: '#1976d2' }}
                                                                    >
                                                                        <EditIcon fontSize="small" />
                                                                    </IconButton>
                                                                    <IconButton
                                                                        size="small"
                                                                        onClick={() => handleDelete(memory.id)}
                                                                        sx={{ color: '#f44336' }}
                                                                    >
                                                                        <DeleteIcon fontSize="small" />
                                                                    </IconButton>
                                                                </Box>
                                                            </Box>

                                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                                                                <Chip
                                                                    icon={<PlaceIcon />}
                                                                    label={memory.location || 'Unknown Location'}
                                                                    size="small"
                                                                    variant="outlined"
                                                                    sx={{ borderColor: '#1976d2', color: '#1976d2' }}
                                                                />
                                                                <Chip
                                                                    icon={<TimeIcon />}
                                                                    label={month}
                                                                    size="small"
                                                                    sx={{ bgcolor: '#e3f2fd', color: '#1976d2' }}
                                                                />
                                                            </Box>

                                                            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                                                                {memory.description}
                                                            </Typography>

                                                            <Divider sx={{ my: 2 }} />

                                                            <Typography variant="caption" sx={{ 
                                                                color: 'text.secondary',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 0.5
                                                            }}>
                                                                <TimeIcon sx={{ fontSize: 14 }} />
                                                                {new Date(memory.createdAt).toLocaleDateString('en-US', {
                                                                    weekday: 'long',
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric'
                                                                })}
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>
                                                </Box>
                                            </Fade>
                                        );
                                    })}
                                </Box>
                            ))}
                        </Box>
                    </Fade>
                ))}

                {sortedMemories.length === 0 && (
                    <Fade in timeout={500}>
                        <Paper sx={{ 
                            p: 6, 
                            textAlign: 'center',
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '16px',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}>
                            <PhotoIcon sx={{ fontSize: 64, color: '#1976d2', mb: 2 }} />
                            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                                No Memories Yet
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                                Start creating your journey by adding memories on the map!
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => navigate('/map')}
                                sx={{
                                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                                    borderRadius: '25px',
                                    px: 4
                                }}
                            >
                                Go to Map
                            </Button>
                        </Paper>
                    </Fade>
                )}
            </Box>

            {/* Edit Memory Modal */}
            <Dialog
                open={isEditModalOpen}
                onClose={handleEditCancel}
                maxWidth="md"
                fullWidth
            >
                {editingMemory && (
                    <MemoryForm
                        initialData={editingMemory}
                        onSubmit={handleEditSubmit}
                        onCancel={handleEditCancel}
                        isEditing={true}
                    />
                )}
            </Dialog>
        </Box>
    );
};

export default Timeline;
