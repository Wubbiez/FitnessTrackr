import { useEffect, useState } from "react";
import styles from "./Activities.module.css";
import * as React from "react";
import { createActivity, editActivity } from "../api/apirequests";
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
  const [selectedActivityId, setSelectedActivityId] = useState("");
  const [openEdit, setOpenEdit] = React.useState(false);
  const [loaded, setLoaded] = useState(false);
  const [openActivity, setOpenActivity] = React.useState(false);

  const handleClickEditActivity = (activityId) => {
    setSelectedActivityId(activityId);
    setOpenEdit(true);
  };

  const EditActivityButton = (Button)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(false);
    try {
      createActivity(token, name, description);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseEdit = () => {
    setSelectedActivityId(null);
    setOpenEdit(false);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    setOpenActivity(false);
    try {
      editActivity(token, selectedActivityId, name, description);
      setLoaded(false);
    } catch (error) {
      console.error(error);
    } finally {
      setName('');
      setDescription('');
    }
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

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("")


  if (token) {
    return (
      <>
        <h1 className={styles.head}>Activities</h1>
        <div>
          <Button type="submit"
                  variant="contained"
                  color="primary" 
                  onClick={handleClickOpen}>
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
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }
                }
              />
              <TextField
                autoFocus
                margin="dense"
                id="description"
                label="description"
                type="description"
                fullWidth
                variant="standard"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
          </Dialog>
        </div>
        <body className={styles.main}>
          <div className={styles.allActivities}>
            {activities.map((activity) => (
              <div key={activity.id} className={styles.activities}>
                <h3>{activity.name}</h3>
                <div>{activity.description}</div>
                <EditActivityButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    const activity =
                    activities.filter(
                      (id) => activities.id == id.id
                    );
                    handleClickEditActivity(
                      activity[0].id
                    );
                  }}
                >
                  Edit Activity
                </EditActivityButton>
                <Dialog
                  open={openEdit}
                  onClose={handleCloseEdit}
                  PaperProps={{
                    style: {
                      backgroundColor: "white",
                      boxShadow: "none",
                    },
                  }}
                >
                  <DialogTitle>Edit activity:</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Choose which changes you want to make
                      below
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="duration"
                      label="duration"
                      type="duration"
                      fullWidth
                      variant="standard"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseEdit}>
                      Cancel
                    </Button>
                    <Button onClick={handleEditSubmit}>
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            ))}
          </div>
        </body>
      </>
    );
  } else {
    return (
      <>
        <h1 className={styles.head}>Activities</h1>
        <body className={styles.main}>
          <div className={styles.allActivities}>
            {activities.map((activity) => (
              <div key={activity.id} className={styles.activities}>
                <h3>{activity.name}</h3>
                <div>{activity.description}</div>
              </div>

            ))}
          </div>
        </body>
      </>
    );

  }
}

export default ActivitiesList