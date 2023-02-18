import { useEffect, useState } from "react";
import styles from "./Activities.module.css";
import * as React from "react";
import { createActivity } from "../api/apirequests";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import { useHistory } from 'react-router-dom';
//needs work



const ActivitiesList = (props) => {
  const { token } = props
  const [activities, setActivities] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };
  const handleSubmit = (props) => {
    const {name, description} = props
    setOpen(false);
    createActivity({name, description})
  };




  useEffect(() => {
    const getActivities = async () => {
      const response = await fetch(
        `http://fitnesstrac-kr.herokuapp.com/api/activities`
      );
      const data = await response.json();
      setActivities(data);
      console.log(data);
    };
    getActivities();
  }, []);


  if (token) {
    return (
      <>
        <h1 className={styles.title}>Activities</h1>
        <div>
          <Button variant="outlined" onClick={handleClickOpen}>
            Create New Activity
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create a new Activity</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To create a new activity please fill out all fields
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="name"
                type="name"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="description"
                label="description"
                type="description"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
          </Dialog>
        </div>

        <div className={styles.routines}>
          {activities.map((activity) => (
            <div key={activity.id} className={styles.title}>
              <h3>{activity.name}</h3>
              <div>{activity.description}</div>
            </div>
          ))}
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1 className={styles.title}>Activities</h1>
        <div className={styles.routines}>
          {activities.map((activity) => (
            <div key={activity.id} className={styles.title}>
              <h3>{activity.name}</h3>
              <div>{activity.description}</div>
            </div>
          ))}
        </div>
      </>
    );

  }
}

export default ActivitiesList