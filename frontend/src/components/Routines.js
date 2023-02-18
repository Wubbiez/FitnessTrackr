import { useEffect, useState } from "react";
import React from "react";
import { Link } from "@mui/material";
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
  margin: theme.spacing(2, 4),
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

const RoutinesList = () => {
  const [routines, setRoutines] = useState([]);
  //   const history = useHistory()

  useEffect(() => {
    getPublicRoutines().then((r) => setRoutines(r));
  }, []);

  return (
    <>
      <Root container justifyContent={"center"}>
        <Typography component={"h1"} variant={"h1"}>
          Routines
        </Typography>
        <Grid container spacing={1}>
          {routines.map((routine) => (
            <Grid item xs={12} sm={12} md={12}>
              <Card component={StyledPaper}>
                <CardContent>
                  <Typography variant={"h5"}>{routine.name}</Typography>
                  <Typography>{routine.goal}</Typography>
                  <Typography>
                    <Link
                      component={"button"}
                      variant={"h5"}
                      onClick={() => {
                        window.location.href = `/${routine.creatorName}/routines`;
                      }}
                    >
                      {routine.creatorName}
                    </Link>
                  </Typography>
                  <div>
                    {" "}
                    {routine.activities.map((activity) => (
                      <Card component={StyledPaper}>
                        <div> Activity ID: {activity.id} </div>
                        <div> Name: {activity.name} </div>
                        <div> Description: {activity.description} </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
              {/* <button
          onClick={
            () => {
              history.push({pathname:`/posts/${post._id}`,
            state: post});
              console.log(post.title)
              console.log(post.description)
              console.log(post.price)
            }
          }
        >
          View Listing
        </button> */}
            </Grid>
          ))}
        </Grid>
      </Root>
    </>
  );
};

export default RoutinesList;
