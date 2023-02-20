import { useEffect, useState } from "react";
import styles from "./Activities.module.css";
import * as React from "react";
import {
  createActivity,
  editActivity,
  getAllActivities,
  getPublicRoutines,
} from "../api/apirequests";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import { useHistory } from 'react-router-dom';
//needs work

const ActivitiesList = (props) => {
  const { token } = props;
  const [activities, setActivities] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [activityId, setActivityId] = React.useState("");
  const [openEdit, setOpenEdit] = React.useState(false);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getAllActivities().then((r) => setActivities(r));
    setLoaded(true);
  }, [token]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleActivityId = (event) => {
    setActivityId(event.target.value);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    setOpenEdit(false);
    try {
      editActivity(token, activityId, name, description);
      setLoaded(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(false);
    try {
      createActivity(token, name, description);
      setLoaded(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className={styles.head}>Activities</h1>
      {token ? (
        <div>
          <Button variant="outlined" onClick={handleClickOpen}>
            Create New Activity
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                backgroundColor: "white",
                boxShadow: "none",
              },
            }}
          >
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
                }}
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
      ) : null}
      <body className={styles.main}>
        <div className={styles.allActivities}>
          {activities.map((activity) => (
            <div key={activity.id} className={styles.activities}>
              <h3>{activity.name}</h3>
              <div>{activity.description}</div>
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setActivityId(activity.id);
                    setName(activity.name);
                    setDescription(activity.description);
                    handleClickOpenEdit();
                  }}
                >
                  Edit
                </Button>
                <Dialog
                  PaperProps={{
                    style: {
                      backgroundColor: "white",
                      boxShadow: "none",
                    },
                  }}
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
                      Choose which changes you want to make below
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
                      }}
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
                    <Button onClick={handleCloseEdit}>Cancel</Button>
                    <Button onClick={handleEditSubmit}>Submit</Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </body>
    </>
  );
};

export default ActivitiesList;
