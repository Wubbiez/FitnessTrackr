import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// import Typography from "@mnpm update @material-ui/core@^4.11.2 react@^17.0.0ui/material/Typography";
import MyForm from "./components/Login";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material";

function App() {
  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            CDN example
          </Typography>
          <Typography variant="h4" component="h1" align="center">
            <Button variant="text">Text</Button>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
          </Typography>
        </Box>
      </Container>
      <MyForm />
    </>
  );
}
export default App;
