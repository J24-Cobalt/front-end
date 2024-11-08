import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grow from '@mui/material/Grow';

const style = {
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 8, // Add rounded corners
};

const SignUpModal = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>Sign Up</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                BackdropProps={{
                    style: { backdropFilter: 'blur(10px)' }, // Apply blur effect
                }}
                closeAfterTransition
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Grow in={open}>
                    <Box sx={{ ...style, display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 2 }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', mb: 2 }}>
                            Sign Up
                        </Typography>
                        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Box sx={{ mb: 2, width: '100%' }}>
                                <Typography variant="body1" sx={{ mb: 1 }}>First Name</Typography>
                                <input type="text" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                            </Box>
                            <Box sx={{ mb: 2, width: '100%' }}>
                                <Typography variant="body1" sx={{ mb: 1 }}>Last Name</Typography>
                                <input type="text" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                            </Box>
                            <Box sx={{ mb: 2, width: '100%' }}>
                                <Typography variant="body1" sx={{ mb: 1 }}>E-Mail</Typography>
                                <input type="email" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                            </Box>
                            <Box sx={{ mb: 2, width: '100%' }}>
                                <Typography variant="body1" sx={{ mb: 1 }}>Password</Typography>
                                <input type="password" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                            </Box>
                            <Box sx={{ mb: 2, width: '100%' }}>
                                <Typography variant="body1" sx={{ mb: 1 }}>Confirm Password</Typography>
                                <input type="password" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                            </Box>
                            <Button variant="contained" color="primary" type="submit" sx={{ width: '100%' }}>
                                Sign Up
                            </Button>
                        </Box>
                    </Box>
                </Grow>
            </Modal>
        </div>
    );
};

export default SignUpModal;