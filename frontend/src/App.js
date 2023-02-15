import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// import Typography from "@mnpm update @material-ui/core@^4.11.2 react@^17.0.0ui/material/Typography";
import MyForm from "./components/Login";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Container sx={{ my: 2 }} maxWidth="sm">
        <MyForm />
      </Container>
    </>
  );
}
export default App;
