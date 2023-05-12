import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import dayjs from "dayjs";

import DialogTitle from '@mui/material/DialogTitle';
import { ListItem, MenuItem, Select } from "@mui/material";

export default function AddTraining(props) {

    const [customers, setCustomers] = useState([]);

    useEffect(() => fetchData(), [])
    const fetchData = () => {
        fetch('http://traineeapp.azurewebsites.net/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => Error(err))

    }

    const [open, setOpen] = React.useState(false);
    const [training, setTtraining] = useState({
        id: '',
        date: '',
        duration: '',
        activity: '',
        customer: {
            firstname: '',
            lastname: ''
        }

    })

    //Open modal
    const handleClickOpen = () => {
        setOpen(true);
    };
    //Close modal
    const handleClose = () => {
        setOpen(false);
    };
    const handleInputChange = (e) => {

        setTtraining({ ...training, [e.target.name]: e.target.value })
    }

    const addTraining = () => {
        props.updateTraining(training)
        handleClose();
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>
                ADD TRAINING
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="form-dialog-title">ADD TRAINING</DialogTitle>
                <DialogContent>
                    <Select 
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    {...customers.map((customer) => {
                        <MenuItem key={customer.links.self} value={customer.links.self}>{customer.links.lastname}</MenuItem>
                      })}
                    />



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
                    <Button onClick={addTraining}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}