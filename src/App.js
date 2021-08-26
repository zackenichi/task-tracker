import React from "react";
import { Container } from "@material-ui/core";
import "./App.css";
import Tasks from "./Components/Tasks";
import SearchAppBar from "./Components/SearchAppBar";

function App() {
  return (
    <div>
      <SearchAppBar />
      <Container maxWidth="lg">
        <Tasks />
      </Container>
    </div>
  );
}

export default App;
