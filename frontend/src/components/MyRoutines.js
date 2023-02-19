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
  getUsersRoutines,
  removeRoutine,
} from "../api/apirequests";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";

const Root = styled(Grid)(({ theme }) => ({
  maxHeight: "90vh",
}));

const Main = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(4, 4),
  display: "flex",
  flexDirection: "column",
  width: "100%",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2, 2),
  display: "flex",
  flexDirection: "column",
}));
const DeleteButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 0, 0),
}));
const ActivityButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 0, 0),
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenActivity = (routineId) => {
    setSelectedRoutineId(routineId);
    setOpenActivity(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseActivity = () => {
    setSelectedRoutineId(null);
    setOpenActivity(false);
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
      createRoutine(token, name, goal, isPublic);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsersRoutines(username).then((r) => setRoutines(r));
  }, []);

  const selectedRoutine = routines.find(
    (item) => item.id === selectedRoutineId
  );
  return (
    <>
      <Root container justifyContent={"center"}>
        <Main
          item
          xs={12}
          sm={12}
          md={12}
          component={StyledPaper}
          elevation={6}
          square
          justify="center" // center horizontally
          alignItems="center" // center vertically
        >
          <Typography component={"h1"} variant={"h1"} position="sticky">
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
                <Card component={StyledPaper} key={index}>
                  <CardContent>
                    <Typography variant={"h5"}>{routine.name}</Typography>
                    <Typography>{routine.goal}</Typography>
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
                    <Dialog open={openActivity} onClose={handleCloseActivity}>
                      <DialogTitle>
                        Add activity to the{" "}
                        {selectedRoutine ? selectedRoutine.name : null} routine
                      </DialogTitle>
                      <DialogContent>
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
                        <Button onClick={handleCloseActivity}>Cancel</Button>
                        <Button onClick={handleSubmitActivity}>Submit</Button>
                      </DialogActions>
                    </Dialog>
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
