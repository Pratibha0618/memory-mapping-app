import React, { useState, useEffect } from 'react';
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Typography,
    Chip,
    Divider,
    InputAdornment
} from '@mui/material';
import {
    Save as SaveIcon,
    Place as PlaceIcon,
    Title as TitleIcon,
    Notes as NotesIcon
} from '@mui/icons-material';

function MemoryForm({ location, initialData, onSubmit, onCancel, isEditing = false }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [locationName, setLocationName] = useState('');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setDescription(initialData.description || '');
            setLocationName(initialData.location || '');
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const memoryData = {
            title: title.trim(),
            description: description.trim(),
            location: locationName.trim(),
            ...(location
                ? {
                    latitude: location.lat,
                    longitude: location.lng
                }
                : {
                    latitude: initialData?.latitude,
                    longitude: initialData?.longitude
                })
        };
        onSubmit(memoryData);
        if (!isEditing) {
            setTitle('');
            setDescription('');
            setLocationName('');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
                <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
                    {isEditing ? 'Edit Memory' : 'Add New Memory'}
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ pt: 3, pb: 1, maxHeight: '50vh', overflowY: 'auto' }}>
                <Box sx={{ mt: 2, mb: 1 }}>
                    <TextField
                        label="Memory Title"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        variant="outlined"
                        placeholder="Give your memory a meaningful title..."
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <TitleIcon color="primary" />
                                </InputAdornment>
                            )
                        }}
                        sx={{
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px'
                            }
                        }}
                    />

                    <TextField
                        label="Location"
                        fullWidth
                        value={locationName}
                        onChange={(e) => setLocationName(e.target.value)}
                        variant="outlined"
                        placeholder="Where did this happen?"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PlaceIcon color="primary" />
                                </InputAdornment>
                            )
                        }}
                        sx={{
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px'
                            }
                        }}
                    />

                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={3}
                        size="small"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        variant="outlined"
                        placeholder="Describe your memory in detail..."
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <NotesIcon color="primary" />
                                </InputAdornment>
                            )
                        }}
                        sx={{
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px'
                            }
                        }}
                    />
                </Box>

                {isEditing && initialData && (
                    <>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <Chip
                                label={`Created: ${new Date(initialData.createdAt).toLocaleDateString()}`}
                                size="small"
                                variant="outlined"
                            />
                            {initialData.updatedAt && (
                                <Chip
                                    label={`Updated: ${new Date(initialData.updatedAt).toLocaleDateString()}`}
                                    size="small"
                                    variant="outlined"
                                    color="secondary"
                                />
                            )}
                        </Box>
                    </>
                )}
            </DialogContent>

            <DialogActions sx={{ p: 1.5, gap: 1, justifyContent: 'center' }}>
                {onCancel && (
                    <Button
                        onClick={onCancel}
                        variant="outlined"
                        size="small"
                        sx={{ px: 2 }}
                    >
                        Cancel
                    </Button>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    disabled={!title.trim() || !description.trim()}
                    size="small"
                    sx={{ px: 3 }}
                >
                    {isEditing ? 'Update Memory' : 'Save Memory'}
                </Button>
            </DialogActions>
        </Box>
    );
}

export default MemoryForm;
