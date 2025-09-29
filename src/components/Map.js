import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MemoryForm from './MemoryForm';
import './MapStyles.css';
import {
    Button,
    Fab,
    Box,
    Typography,
    Chip,
    Card,
    CardContent,
    IconButton,
    Tooltip,
    Slide
} from '@mui/material';
import {
    Timeline as TimelineIcon,
    Share as ShareIcon,
    Info as InfoIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ShareDialog from './ShareDialog';


const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/484/484167.png",
    iconSize: [42, 42],
    iconAnchor: [21, 42],
    popupAnchor: [0, -42],
    className: 'custom-marker-icon'
});



function CustomMarker({ memory, onEditMemory, onDelete, readOnly = false }) {
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleUpdate = (updatedMemory) => {
        console.log('Updating memory:', memory.id, updatedMemory);
        onEditMemory(memory.id, updatedMemory);
        setIsEditing(false);
    };

    return (
        <Marker
            position={[memory.latitude, memory.longitude]}
            icon={customIcon}
        >
            <Popup className="modern-popup" maxWidth={320}>
                {isEditing ? (
                    <MemoryForm
                        initialData={memory}
                        onSubmit={handleUpdate}
                        onCancel={() => setIsEditing(false)}
                        isEditing={true}
                    />
                ) : (
                    <Card sx={{ boxShadow: 'none', borderRadius: 0 }}>
                        <div className="memory-thumbnail" style={{ backgroundImage: `url(https://source.unsplash.com/random/300x200?sig=${memory.id})` }}>
                            <Box sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                display: 'flex',
                                gap: 0.5
                            }}>
                                <Chip
                                    label={new Date(memory.createdAt).toLocaleDateString()}
                                    size="small"
                                    sx={{
                                        bgcolor: 'rgba(0,0,0,0.7)',
                                        color: 'white',
                                        fontSize: '0.7rem'
                                    }}
                                />
                            </Box>
                        </div>
                        <CardContent sx={{ p: 2 }}>
                            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                                {memory.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                📍 {memory.location || 'Unknown Location'}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.4 }}>
                                {memory.description}
                            </Typography>
                            {!readOnly && (
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={handleEdit}
                                        sx={{ flex: 1, borderRadius: '20px' }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        color="error"
                                        onClick={() => onDelete(memory.id)}
                                        sx={{ flex: 1, borderRadius: '20px' }}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                )}
            </Popup>
        </Marker>
    );
}

function MapComponent({ memories, onAddMemory, onEditMemory, onDeleteMemory, readOnly = false }) {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
    const [selectedMemoryForShare, setSelectedMemoryForShare] = useState(null);
    const [showControls, setShowControls] = useState(true);
    const navigate = useNavigate();

    console.log('Current selectedLocation:', selectedLocation);


    function MapEvents() {
        useMapEvents({
            click(e) {
                console.log('Map clicked at:', e.latlng);
                console.log('Setting selectedLocation to:', e.latlng);
                setSelectedLocation(e.latlng);
            },
        });
        return null;
    }

    return (
        <>
            <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {!readOnly && <MapEvents />}
                {memories.map((memory) => (
                    <CustomMarker
                        key={memory.id}
                        memory={memory}
                        onEditMemory={onEditMemory}
                        onDelete={onDeleteMemory}
                        readOnly={readOnly}
                    />
                ))}
                {selectedLocation && (
                    <Marker 
                        position={[selectedLocation.lat, selectedLocation.lng]} 
                        icon={customIcon}
                    >
                        <Popup 
                            className="custom-popup"
                            autoOpen={true}
                        >
                            <div className="memory-form">
                                <MemoryForm
                                    location={selectedLocation}
                                    onSubmit={(memory) => {
                                        console.log('Memory submitted:', memory);
                                        onAddMemory(memory);
                                        setSelectedLocation(null);
                                    }}
                                    onCancel={() => {
                                        console.log('Memory form cancelled');
                                        setSelectedLocation(null);
                                    }}
                                />
                            </div>
                        </Popup>
                    </Marker>
                )}
            </MapContainer>


            {/* Modern Control Panel */}
            <Slide direction="down" in={showControls} mountOnEnter unmountOnExit>
                <Box sx={{
                    position: 'absolute',
                    top: 16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                    pointerEvents: 'auto'
                }}>
                    {!readOnly && (
                        <>
                            <Tooltip title="Timeline View">
                                <Fab
                                    size="medium"
                                    onClick={() => navigate('/timeline')}
                                    sx={{
                                        background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                                        color: 'white',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #1565c0, #1976d2)'
                                        }
                                    }}
                                >
                                    <TimelineIcon />
                                </Fab>
                            </Tooltip>
                            <Tooltip title="Share Memories">
                                <Fab
                                    size="medium"
                                    onClick={() => setIsShareDialogOpen(true)}
                                    sx={{
                                        background: 'linear-gradient(45deg, #4caf50, #66bb6a)',
                                        color: 'white'
                                    }}
                                >
                                    <ShareIcon />
                                </Fab>
                            </Tooltip>
                        </>
                    )}
                    <Tooltip title={showControls ? "Hide Controls" : "Show Controls"}>
                        <IconButton
                            onClick={() => setShowControls(!showControls)}
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.9)',
                                backdropFilter: 'blur(10px)',
                                '&:hover': { bgcolor: 'rgba(255,255,255,1)' }
                            }}
                        >
                            {showControls ? <CloseIcon /> : <InfoIcon />}
                        </IconButton>
                    </Tooltip>
                </Box>
            </Slide>

            {/* Memory Counter */}
            {memories.length > 0 && (
                <Box sx={{
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    zIndex: 1000
                }}>
                    <Chip
                        label={`${memories.length} ${memories.length === 1 ? 'Memory' : 'Memories'}`}
                        sx={{
                            bgcolor: 'rgba(25, 118, 210, 0.9)',
                            color: 'white',
                            fontWeight: 'bold',
                            backdropFilter: 'blur(10px)'
                        }}
                    />
                </Box>
            )}

            {/* Instructions for new users */}
            {!readOnly && memories.length === 0 && (
                <Box sx={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                    zIndex: 1000,
                    maxWidth: 300
                }}>
                    <Card sx={{
                        bgcolor: 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <CardContent sx={{ p: 2 }}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
                                💡 Getting Started
                            </Typography>
                            <Typography variant="caption">
                                Click anywhere on the map to add your first memory!
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            )}

            {!readOnly && (
                <ShareDialog
                    open={isShareDialogOpen}
                    onClose={() => {
                        setIsShareDialogOpen(false);
                        setSelectedMemoryForShare(null);
                    }}
                    memories={memories}
                    selectedMemory={selectedMemoryForShare}
                />
            )}

        </>
    );
}





export default MapComponent;
