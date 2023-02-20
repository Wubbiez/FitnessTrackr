import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Paper,
  styled,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import {
  createRoutine,
  createRoutineActivity,
  editRoutineActivity,
  getUsersRoutines,
  removeRoutine,
  removeRoutineActivity,
} from "../api/apirequests";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  FormControlLabel,
  Radio,
  FormControl,
  RadioGroup,
  Select,
  MenuItem,
} from "@mui/material";

import { getAllActivities } from "../api/apirequests";

const Root = styled(Grid)(({ theme }) => ({
  maxHeight: "90vh",
}));

const Main = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(4, 4),
  display: "flex",
  flexDirection: "column",
  width: "100%",
}));

const Routines = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2, 2),
  display: "flex",
  flexDirection: "column",
}));
const Activities = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(4, 2),
  display: "flex",
  flexDirection: "column",
}));
const DeleteButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 0, 0),
}));
const RemoveActivityButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));
const ActivityButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 0, 0),
}));
const EditActivityButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 0, 0),
}));
function MyRoutines(props) {
  const { token, username } = props;
  const [open, setOpen] = React.useState(false);
  const [openActivity, setOpenActivity] = React.useState(false);
  const [name, setName] = React.useState("");
  const [goal, setGoal] = React.useState("");
  const [isPublic, setIsPublic] = React.useState(false);
  const [routines, setRoutines] = useState([]);
  const [selectedRoutineId, setSelectedRoutineId] = useState(null);
  const [activities, setActivities] = useState([]);
  const [selectedActivityId, setSelectedActivityId] = useState("");
  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [openEdit, setOpenEdit] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenActivity = (routineId) => {
    setSelectedRoutineId(routineId);
    setOpenActivity(true);
  };

  const handleClickEditActivity = (activityId) => {
    setSelectedActivityId(activityId);
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseActivity = () => {
    setSelectedRoutineId(null);
    setOpenActivity(false);
  };

  const handleCloseEdit = () => {
    setSelectedActivityId(null);
    setOpenEdit(false);
  };
  const handleEditSubmit = (event) => {
    event.preventDefault();
    setOpenActivity(false);
    try {
      editRoutineActivity(token, selectedActivityId, count, duration);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(false);
    try {
      createRoutine(token, name, goal, isPublic);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmitActivity = (event) => {
    event.preventDefault();
    setOpenActivity(false);
    try {
      createRoutineActivity(token, selectedActivityId, count, duration);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsersRoutines(username).then((r) => setRoutines(r));
    getAllActivities().then((r) => setActivities(r));
  }, []);

  const selectedRoutine = routines.find(
    (item) => item.id === selectedRoutineId
  );

  const handleSelectChange = (event) => {
    setSelectedActivityId(event.target.value);
  };

  return (
    <>
      <Root container justifyContent={"center"}>
        <Main
          item
          xs={12}
          sm={12}
          md={12}
          elevation={6}
          square
          justify="center" // center horizontally
          alignItems="center" // center vertically
        >
          <Typography component={"h1"} variant={"h2"} position="sticky">
            My Routines
          </Typography>

          {token ? (
            <div>
              <Button variant="outlined" onClick={handleClickOpen}>
                Create New Routine
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create a new Routine</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To create a new routine please fill out all fields
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
                    id="goal"
                    label="goal"
                    type="goal"
                    fullWidth
                    variant="standard"
                    value={goal}
                    onChange={(e) => {
                      setGoal(e.target.value);
                    }}
                  />
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      value={isPublic.toString()}
                      name="radio-buttons-group"
                      onChange={(e) => {
                        setIsPublic(e.target.value === "true");
                      }}
                    >
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="public"
                      />
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="private"
                      />
                    </RadioGroup>
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
              </Dialog>
            </div>
          ) : null}

          <Grid container spacing={1}>
            {routines.map((routine, index) => (
              <Grid item xs={12} sm={12} md={12}>
                <Card component={Routines} key={index}>
                  <CardContent>
                    <Typography variant={"h5"}>{routine.name}</Typography>
                    <Typography>{routine.goal}</Typography>
                    <Box display={"flex"} justifyContent={"center"}>
                      <ActivityButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleClickOpenActivity(routine.id);
                        }}
                      >
                        Add Activity
                      </ActivityButton>
                    </Box>
                    <CardContent>
                      {routines
                        ? routine.activities.map((activity) => (
                            <Card component={Activities}>
                              <div> Name: {activity.name} </div>
                              <div> Description: {activity.description} </div>
                              <div> Count: {activity.count} </div>
                              <div> Duration: {activity.duration} </div>
                              <Box display={"flex"} justifyContent={"center"}>
                                <EditActivityButton
                                  type="submit"
                                  variant="contained"
                                  color="primary"
                                  onClick={() => {
                                    const routineActivity =
                                      routine.activities.filter(
                                        (id) => activity.id == id.id
                                      );
                                    handleClickEditActivity(
                                      routineActivity[0].routineActivityId
                                    );
                                  }}
                                >
                                  Edit Activity
                                </EditActivityButton>

                                <Dialog
                                  open={openEdit}
                                  onClose={handleCloseEdit}
                                >
                                  <DialogTitle>Edit this activity</DialogTitle>
                                  <DialogContent>
                                    <DialogContentText>
                                      Choose which changes you want to make
                                      below
                                    </DialogContentText>
                                    <TextField
                                      autoFocus
                                      margin="dense"
                                      id="count"
                                      label="count"
                                      type="count"
                                      fullWidth
                                      variant="standard"
                                      value={count}
                                      onChange={(e) => {
                                        setCount(e.target.value);
                                      }}
                                    />
                                    <TextField
                                      autoFocus
                                      margin="dense"
                                      id="duration"
                                      label="duration"
                                      type="duration"
                                      fullWidth
                                      variant="standard"
                                      value={duration}
                                      onChange={(e) => {
                                        setDuration(e.target.value);
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

                                <RemoveActivityButton
                                  type="submit"
                                  variant="contained"
                                  color="error"
                                  onClick={() => {
                                    const routineActivity =
                                      routine.activities.filter(
                                        (id) => activity.id == id.id
                                      );
                                    removeRoutineActivity(
                                      token,
                                      routineActivity[0].routineActivityId
                                    );
                                  }}
                                >
                                  Remove Activity
                                </RemoveActivityButton>
                              </Box>
                            </Card>
                          ))
                        : null}
                    </CardContent>

                    <Dialog open={openActivity} onClose={handleCloseActivity}>
                      <DialogTitle>
                        Add activity to the{" "}
                        {selectedRoutine ? selectedRoutine.name : null} routine
                      </DialogTitle>
                      <DialogContent>
                        <Box
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                        >
                          <Typography>Select an Activity:</Typography>
                          <Select
                            value={selectedActivityId}
                            onChange={handleSelectChange}
                          >
                            {activities.map((activity) => (
                              <MenuItem value={activity.id}>
                                {activity.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </Box>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="count"
                          label="count"
                          type="count"
                          fullWidth
                          variant="standard"
                          value={count}
                          onChange={(e) => {
                            setCount(e.target.value);
                          }}
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="duration"
                          label="duration"
                          type="duration"
                          fullWidth
                          variant="standard"
                          value={duration}
                          onChange={(e) => {
                            setDuration(e.target.value);
                          }}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseActivity}>Cancel</Button>
                        <Button onClick={handleSubmitActivity}>Submit</Button>
                      </DialogActions>
                    </Dialog>

                    <Box display={"flex"} justifyContent={"flex-end"}>
                      <DeleteButton
                        type="submit"
                        variant="contained"
                        color="error"
                        onClick={() => {
                          removeRoutine(token, routine.id);
                        }}
                      >
                        Delete Routine
                      </DeleteButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Main>
      </Root>
    </>
  );
}

export default MyRoutines;
