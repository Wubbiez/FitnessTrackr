import { useEffect, useState } from "react";
import styles from "./Activities.module.css";
import * as React from "react";
import CreateActivity from "./createActivity";
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
        Open form dialog
      </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address here. We
                will send updates occasionally.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Subscribe</Button>
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