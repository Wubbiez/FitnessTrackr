import { getUsersRoutines } from "../api/apirequests";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  styled,
  Paper,
  Box,
} from "@mui/material";

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

const UsersRoutines = (props) => {
  const { routineCreator } = useParams();
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    console.log(routineCreator);
    getUsersRoutines(routineCreator).then((routines) => {
      setRoutines(routines);
    });
  }, []);

  return (
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
        {routineCreator}'s Routines
      </Typography>
      <Grid container spacing={1}>
        {routines.map((routine, index) => (
          <Grid item xs={12} sm={12} md={12}>
            <Card component={Routines} key={index}>
              <CardContent>
                <Typography variant={"h5"}>{routine.name}</Typography>
                <Typography>{routine.goal}</Typography>

                <Box component={tableHeader}>
                  <Typography variant={"h5"}>Activities:</Typography>
                  {routine.activities.map((activity) => (
                    <Card component={Activities}>
                      <Box component={ActivityDescriptions}>
                        <Typography>Name: {activity.name} </Typography>
                        <Typography>
                          Description: {activity.description}
                        </Typography>
                        <Typography>Count: {activity.count}</Typography>
                        <Typography>Duration: {activity.duration}</Typography>
                      </Box>
                    </Card>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Main>
  );
};

export default UsersRoutines;
