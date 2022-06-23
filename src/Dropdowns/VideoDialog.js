import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Paper, Tooltip } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import Webcam from "react-webcam";

navigator.getMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

const Transition = React.forwardRef(function Transition(
    props, ref
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function VideoDialog() {
    const [open, setOpen] = useState(false);
    const [videoOn, setVideoOn] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setInterval(() =>
            navigator.getMedia({ video: true }, function () {
                setVideoOn(true)
            }, function () {
                setVideoOn(false)
            }), 1000);
    }, [])


    return (
        <div>
            <Paper>
                <Tooltip title={videoOn ? `Turn on video` : `Video is off`}><Button style={{ color: '#fdb51b' }} onClick={handleClickOpen}>{!videoOn ? <VideocamOffIcon /> : <VideocamIcon />}</Button></Tooltip>
            </Paper>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Please allow video permissions"}</DialogTitle>
                <Webcam
                    audio={false}
                    height={`100%`}
                    screenshotFormat="image/jpeg"
                    width={`100%`}
                    videoConstraints={{
                        width: `100%`,
                        height: `100%`,
                        facingMode: "user"
                    }}
                />
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
