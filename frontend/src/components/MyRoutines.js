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
import { getUsersRoutines } from "../api/apirequests";

const Root = styled(Grid)({
  maxHeight: "90vh",
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2, 4),
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(4),
}));
function MyRoutines(props) {
  const { user } = props;
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    getUsersRoutines(user).then((r) => setRoutines(r));
  }, []);

  return (
    <>
      <Root container justifyContent={"center"}>
        <Typography component={"h1"} variant={"h1"}>
          My Routines
        </Typography>
        <Grid container spacing={1}>
          {routines.map((routine, index) => (
            <Grid item xs={12} sm={12} md={12}>
              <Card component={StyledPaper} key={index}>
                <CardContent>
                  <Typography variant={"h5"}>{routine.name}</Typography>
                  <Typography>{routine.goal}</Typography>
                  <Typography>
                    <Link
                      component={"button"}
                      variant={"h5"}
                      onClick={() => {
                        window.location.href = `/routines/${routine.id}`;
                      }}
                    >
                      View Routine
                    </Link>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Root>
    </>
  );
}

export default MyRoutines;
