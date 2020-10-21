// @flow
import * as React from "react";
import { CssBaseline } from "@material-ui/core";
import AddTodoForm from "../../containers/FormContainer";
import VisibleList from "../../containers/ListContainer";
import Header from "../../elements/Header";
import Notification from "../../containers/NotificationContainer";
import SidePanel from "../SidePanel";
import Navbar from "../../elements/Navbar";
import { StyledApp, StyledContainer } from "./styles";

const App = (): React.Node => {
  const [showPanel, toggleShowPanel] = React.useState(false);
  const togglePanel = () => toggleShowPanel(!showPanel);
  return (
    <StyledApp>
      <CssBaseline />
      <StyledContainer maxWidth="sm">
        <Navbar onClick={togglePanel}>
          <Header variant="h3" text="TodoApp" />
        </Navbar>
        <SidePanel open={showPanel} togglePanel={togglePanel} />
        <AddTodoForm />
        <VisibleList />
        <Notification />
      </StyledContainer>
    </StyledApp>
  );
};

export default App;
