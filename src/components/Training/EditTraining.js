import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import dayjs from "dayjs";

import DialogTitle from '@mui/material/DialogTitle';

export default function EditTraining(props) {

    const [open, setOpen] = React.useState(false);
    const [training, setTtraining] = useState({
        id: '',
        date: '',
        duration: '',
        activity: '',
     
    })

    //dayjs(row.accessorKey).format('DD.MM.YYYY')

    const handleClickOpen = () => {
     
        setTtraining({
                 
            date: dayjs(props.training.date).format('DD.MM.YYYY'),
            duration: props.training.duration,
            activity: props.training.activity,
     
          }) 
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleInputChange = (e) => {
       
        setTtraining({...training, [e.target.name]: e.target.value})
    }

    const updateTraining = () => {
        props.updateTraining(training, props.id)
        handleClose();
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="form-dialog-title">Edit training </DialogTitle>
                <DialogContent>
    
                    <TextField
                        autoFocus
                        margin="dense"
                        name="date"
                        value={training.date}
                        onChange={e => handleInputChange(e)}
                        label="date"
                        fullWidth
                    />
                      <TextField
                        autoFocus
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={e => handleInputChange(e)}
                        label="duration"
                        fullWidth
                    />
                      <TextField
                        autoFocus
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={e => handleInputChange(e)}
                        label="activity"
                        fullWidth
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={updateTraining}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}