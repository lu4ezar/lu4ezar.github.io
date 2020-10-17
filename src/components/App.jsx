import React from "react";
import { Container, CssBaseline } from "@material-ui/core";
import AddTodoForm from "../containers/FormContainer";
import VisibleList from "../containers/ListContainer";
import Header from "../elements/Header";
import Notification from "../containers/NotificationContainer";
import SidePanel from "./SidePanel";
import Navbar from "../elements/Navbar";
import AddButton from "../containers/AddButtonContainer";

const App = () => {
  const [showPanel, toggleShowPanel] = React.useState(false);
  const togglePanel = () => toggleShowPanel(!showPanel);
  return (
    <div>
      <CssBaseline />
      <Container maxWidth="lg">
        <Navbar onClick={togglePanel}>
          <Header variant="h3" text="TodoApp" />
        </Navbar>
        <SidePanel open={showPanel} togglePanel={togglePanel} />
        <AddTodoForm />
        <VisibleList />
        <AddButton />
        <Notification />
      </Container>
    </div>
  );
};

export default App;
