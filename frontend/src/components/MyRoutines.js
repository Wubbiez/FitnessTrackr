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
  editRoutine,
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

const Routines = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2, 2),
  display: "flex",
  flexDirection: "column",
  backgroundColor: "lightblue",
}));
const Activities = styled(Card)(({ theme }) => ({
  margin: theme.spacing(4, 2),
  display: "flex",
  flexDirection: "column",
  backgroundColor: "aliceblue",
}));
const ActivityDescriptions = styled("div")(({ theme }) => ({
  margin: theme.spacing(2, 2),
  display: "flex",
  flexDirection: "column",
}));
const tableHeader = styled("div")(({ theme }) => ({
  margin: theme.spacing(2, 2),
  fontWeight: "bold",
  padding: theme.spacing(1, 1),
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
}));

const DeleteButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));
const RemoveActivityButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));
const ActivityButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 0, 0),
}));
const EditActivityButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const EditRoutineButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const StyledMenuItem = styled(MenuItem)({
  background: "white", // replace with desired color
  "&:hover": {
    background: "lightblue",
  },
});

function MyRoutines(props) {
  const { token, username } = props;
  const [open, setOpen] = React.useState(false);
  const [openActivity, setOpenActivity] = React.useState(false);
  const [name, setName] = React.useState("");
  const [goal, setGoal] = React.useState("");
  const [isPublic, setIsPublic] = React.useState(true);
  const [routines, setRoutines] = useState([]);
  const [selectedRoutineId, setSelectedRoutineId] = useState(null);
  const [activities, setActivities] = useState([]);
  const [selectedActivityId, setSelectedActivityId] = useState("");
  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openRoutine, setOpenRoutine] = React.useState(false);
  const [loaded, setLoaded] = useState(false);
  const [selectedRoutineActivity, setSelectedRoutineActivity] = useState([]);

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

  const handleClickEditRoutine = (routineId) => {
    setSelectedRoutineId(routineId);
    setOpenRoutine(true);
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

  const handleCloseRoutine = () => {
    setSelectedRoutineId(null);
    setOpenRoutine(false);
  };
  const handleEditSubmit = (event) => {
    event.preventDefault();
    setOpenActivity(false);
    try {
      editRoutineActivity(token, selectedActivityId, count, duration);
      setLoaded(false);
    } catch (error) {
      console.error(error);
    } finally {
      setCount(0);
      setDuration(0);
    }
  };

  const handleRoutineEditSubmit = (event) => {
    event.preventDefault();
    setOpenRoutine(false);
    try {
      editRoutine(token, selectedRoutineId, name, goal, isPublic);
      setLoaded(false);
    } catch (error) {
      console.error(error);
    } finally {
      setName("");
      setGoal("");
      setIsPublic(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(false);
    try {
      createRoutine(token, name, goal, isPublic);
    } catch (error) {
      console.error(error);
    } finally {
      setName("");
      setGoal("");
      setIsPublic(true);
      setLoaded(false);
    }
  };
  const handleSubmitActivity = (event) => {
    event.preventDefault();
    setOpenActivity(false);
    try {
      createRoutineActivity(
        token,
        selectedRoutineId,
        selectedActivityId,
        count,
        duration
      );
    } catch (error) {
      console.error(error);
    } finally {
      setCount(0);
      setDuration(0);
      setLoaded(false);
    }
  };

  useEffect(() => {
    getUsersRoutines(username).then((r) => setRoutines(r));
    getAllActivities().then((r) => setActivities(r));
    setLoaded(true);
  }, [token, loaded]);

  const handleSelectChange = (event) => {
    event.preventDefault();
    setSelectedActivityId(event.target.value);
  };

  return (
    <>
      <Root container justifyContent={"center"}>
        <Main
          item
          xs={12}
          sm={8}
          md={8}
          elevation={6}
          square
          justify="center" // center horizontally
          alignItems="center" // center vertically
        >
          <Typography component={"h1"} variant={"h2"}>
            My Routines
          </Typography>

          {token ? (
            <div>
              <Button variant="outlined" onClick={handleClickOpen}>
                Create New Routine
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
            {routines
              ? routines.map((routine, index) => (
                  <Grid item xs={12} sm={12} md={12}>
                    <Card component={Routines} key={index}>
                      <CardContent>
                        <Box>
                          <Typography variant={"h5"}>{routine.name}</Typography>
                          <Typography>{routine.goal}</Typography>
                        </Box>
                        <Box component={tableHeader}>
                          <Typography variant={"h5"}>Activities:</Typography>
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
                                    <Box component={ActivityDescriptions}>
                                      <Typography>
                                        {" "}
                                        Activity Name: {activity.name}{" "}
                                      </Typography>
                                      <Typography>
                                        Description: {activity.description}
                                      </Typography>
                                      <Typography>
                                        Count: {activity.count}
                                      </Typography>
                                      <Typography>
                                        Duration: {activity.duration}
                                      </Typography>
                                    </Box>
                                    <Box
                                      display={"flex"}
                                      justifyContent={"center"}
                                    >
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
                                        PaperProps={{
                                          style: {
                                            backgroundColor: "white",
                                            boxShadow: "none",
                                          },
                                        }}
                                      >
                                        <DialogTitle>
                                          Edit activity:
                                        </DialogTitle>
                                        <DialogContent>
                                          <DialogContentText>
                                            Choose which changes you want to
                                            make below
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
                                          setSelectedRoutineActivity(
                                            routineActivity
                                          );
                                          removeRoutineActivity(
                                            token,
                                            routineActivity[0].routineActivityId
                                          );
                                          setLoaded(false);
                                        }}
                                      >
                                        Remove Activity
                                      </RemoveActivityButton>
                                    </Box>
                                  </Card>
                                ))
                              : null}
                          </CardContent>
                        </Box>

                        <Dialog
                          open={openActivity}
                          onClose={handleCloseActivity}
                          PaperProps={{
                            style: {
                              backgroundColor: "white",
                              boxShadow: "none",
                            },
                          }}
                        >
                          <DialogTitle>
                            Add activity to the {selectedRoutineActivity.name}{" "}
                            routine
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
                                  <StyledMenuItem value={activity.id}>
                                    {activity.name}
                                  </StyledMenuItem>
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
                            <Button onClick={handleCloseActivity}>
                              Cancel
                            </Button>
                            <Button onClick={handleSubmitActivity}>
                              Submit
                            </Button>
                          </DialogActions>
                        </Dialog>

                        <Box display={"flex"} justifyContent={"space-between"}>
                          <EditRoutineButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              handleClickEditRoutine(routine.id);
                            }}
                          >
                            Edit Routine
                          </EditRoutineButton>

                          <Dialog
                            open={openRoutine}
                            onClose={handleCloseRoutine}
                            PaperProps={{
                              style: {
                                backgroundColor: "white",
                                boxShadow: "none",
                              },
                            }}
                          >
                            <DialogTitle>Edit Routine:</DialogTitle>
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
                                defaultValue={name}
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
                                defaultValue={goal}
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
                              <Button onClick={handleCloseRoutine}>
                                Cancel
                              </Button>
                              <Button onClick={handleRoutineEditSubmit}>
                                Submit
                              </Button>
                            </DialogActions>
                          </Dialog>

                          <DeleteButton
                            type="submit"
                            variant="contained"
                            color="error"
                            onClick={() => {
                              removeRoutine(token, routine.id);
                              setLoaded(false);
                            }}
                          >
                            Delete Routine
                          </DeleteButton>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              : null}
          </Grid>
        </Main>
      </Root>
    </>
  );
}

export default MyRoutines;
