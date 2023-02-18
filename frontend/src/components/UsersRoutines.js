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
} from "@mui/material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2, 4),
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(4),
}));

const Root = styled(Grid)({
  maxHeight: "90vh",
});

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
    <Root container justifyContent={"center"}>
      <Typography component={"h1"} variant={"h3"}>
        {routineCreator}'s Routines
      </Typography>
      <Grid container spacing={1}>
        {routines.map((routine, index) => (
          <Grid item xs={12} sm={12} md={12}>
            <Card component={StyledPaper} key={index}>
              <CardContent>
                <Typography variant={"h5"}>{routine.name}</Typography>
                <Typography>{routine.goal}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Root>
  );
};

export default UsersRoutines;
