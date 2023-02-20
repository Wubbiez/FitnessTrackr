import React, { useEffect, useState } from "react";
import { Box, Link } from "@mui/material";
import {
  Grid,
  Paper,
  styled,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { getPublicRoutines } from "../api/apirequests";
// import { useHistory } from 'react-router-dom';
//needs work
const Root = styled(Grid)({
  maxHeight: "90vh",
});
const Main = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(4, 4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center", // center horizontally
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2, 4),
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(4),
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

const RoutinesList = () => {
  const [routines, setRoutines] = useState([]);
  //   const history = useHistory()

  useEffect(() => {
    getPublicRoutines().then((r) => setRoutines(r));
  }, []);

  return (
    <>
      <Root container justifyContent={"center"}>
        <Main item xs={12} sm={8} md={8}>
          <Typography component={"h1"} variant={"h2"}>
            Routines
          </Typography>
          <Grid container spacing={1}>
            {routines.map((routine, index) => (
              <Grid item xs={12} sm={12} md={12}>
                <Card component={Routines} key={index}>
                  <CardContent>
                    <Typography variant={"h5"}>{routine.name}</Typography>
                    <Typography>{routine.goal}</Typography>
                    <Typography>
                      <Link
                        component={"button"}
                        variant={"h5"}
                        onClick={() => {
                          window.location.href = `/users/${routine.creatorName}/routines`;
                        }}
                      >
                        {routine.creatorName}
                      </Link>
                    </Typography>
                    <div>
                      {routine.activities.map((activity) => (
                        <Card component={Activities}>
                          <Box component={ActivityDescriptions}>
                            <Typography>
                              {" "}
                              Activity Name: {activity.name}{" "}
                            </Typography>
                            <Typography>
                              Description: {activity.description}
                            </Typography>
                            <Typography>Count: {activity.count}</Typography>
                            <Typography>
                              Duration: {activity.duration}
                            </Typography>
                          </Box>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Main>
      </Root>
    </>
  );
};

export default RoutinesList;
