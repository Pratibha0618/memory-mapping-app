import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography,
    Box,
    Checkbox,
    FormControlLabel,
    Snackbar,
    Alert,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Divider,
    Tooltip
} from '@mui/material';
import {
    Share as ShareIcon,
    ContentCopy as ContentCopyIcon,
    Facebook as FacebookIcon,
    Twitter as TwitterIcon,
    WhatsApp as WhatsAppIcon,
    Email as EmailIcon
} from '@mui/icons-material';

const ShareDialog = ({ open, onClose, memories, selectedMemory = null }) => {
    const [shareLink, setShareLink] = useState('');
    const [selectedMemories, setSelectedMemories] = useState(selectedMemory ? [selectedMemory.id] : []);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [readOnlyMode, setReadOnlyMode] = useState(true);

    const generateShareLink = () => {
        // Generate a shareable link based on selected memories with read-only access
        const baseUrl = window.location.origin;
        const memoryIds = selectedMemories.join(',');
        const accessToken = btoa(`readonly_${Date.now()}_${Math.random()}`);
        const shareUrl = `${baseUrl}/shared-memories/${memoryIds}?access=${accessToken}&readonly=true`;
        setShareLink(shareUrl);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareLink).then(() => {
            setSnackbarMessage('Link copied to clipboard!');
            setShowSnackbar(true);
        });
    };

    const handleMemoryToggle = (memoryId) => {
        setSelectedMemories(prev => {
            if (prev.includes(memoryId)) {
                return prev.filter(id => id !== memoryId);
            } else {
                return [...prev, memoryId];
            }
        });
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            setSelectedMemories(memories.map(memory => memory.id));
        } else {
            setSelectedMemories([]);
        }
    };

    const handleShare = (platform) => {
        const shareText = "Check out my memories!";
        const url = shareLink || window.location.href;

        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + url)}`, '_blank');
                break;
            case 'email':
                window.location.href = `mailto:?subject=${encodeURIComponent('Shared Memories')}&body=${encodeURIComponent(shareText + '\n\n' + url)}`;
                break;
            default:
                break;
        }
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
                <DialogTitle>Share Memories</DialogTitle>
                <DialogContent sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Select memories to share
                        </Typography>

                        {!selectedMemory && (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedMemories.length === memories.length}
                                        onChange={handleSelectAll}
                                        indeterminate={selectedMemories.length > 0 && selectedMemories.length < memories.length}
                                    />
                                }
                                label="Select All"
                            />
                        )}

                        <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                            {memories.map((memory) => (
                                <React.Fragment key={memory.id}>
                                    <ListItem>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={selectedMemories.includes(memory.id)}
                                                    onChange={() => handleMemoryToggle(memory.id)}
                                                    disabled={selectedMemory && memory.id !== selectedMemory.id}
                                                />
                                            }
                                            label={
                                                <ListItemText
                                                    primary={memory.title}
                                                    secondary={`${memory.location} - ${new Date(memory.createdAt).toLocaleDateString()}`}
                                                />
                                            }
                                        />
                                    </ListItem>
                                    <Divider />
                                </React.Fragment>
                            ))}
                        </List>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={readOnlyMode}
                                    onChange={(e) => setReadOnlyMode(e.target.checked)}
                                />
                            }
                            label="Read-only access (recipients cannot edit memories)"
                            sx={{ mb: 2 }}
                        />
                        <Button
                            variant="contained"
                            onClick={generateShareLink}
                            disabled={selectedMemories.length === 0}
                            startIcon={<ShareIcon />}
                            sx={{ mb: 2, display: 'block' }}
                        >
                            Generate Share Link
                        </Button>

                        {shareLink && (
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <TextField
                                    fullWidth
                                    value={shareLink}
                                    variant="outlined"
                                    size="small"
                                    InputProps={{ readOnly: true }}
                                />
                                <Tooltip title="Copy Link">
                                    <IconButton onClick={handleCopyLink} color="primary">
                                        <ContentCopyIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        )}
                    </Box>

                    <Typography variant="subtitle1" gutterBottom>
                        Share on Social Media
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Tooltip title="Share on Facebook">
                            <IconButton onClick={() => handleShare('facebook')} color="primary">
                                <FacebookIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Share on Twitter">
                            <IconButton onClick={() => handleShare('twitter')} color="primary">
                                <TwitterIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Share on WhatsApp">
                            <IconButton onClick={() => handleShare('whatsapp')} color="primary">
                                <WhatsAppIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Share via Email">
                            <IconButton onClick={() => handleShare('email')} color="primary">
                                <EmailIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Close</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={showSnackbar}
                autoHideDuration={3000}
                onClose={() => setShowSnackbar(false)}
            >
                <Alert onClose={() => setShowSnackbar(false)} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ShareDialog;
