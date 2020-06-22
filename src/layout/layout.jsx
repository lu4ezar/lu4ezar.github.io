import React from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Header from "./header";
import Footer from "./footer";
import HorizontalSplit from "./horizontalSplit";

const OuterDiv = styled(Container)`
  min-height: 100%;
`;

const Layout = props => (
  <OuterDiv className="d-flex flex-column px-0" fluid>
    <Header clear={props.clear} handleChange={props.handleChange} />
    <Container className="d-flex flex-column flex-fill mt-3">
      <HorizontalSplit leftSide={props.leftSide} rightSide={props.rightSide} />
      <Container className="d-flex flex-fill align-items-center justify-content-center mb-3 mb-md-0">
        {props.bottom}
      </Container>
    </Container>
    <Footer />
  </OuterDiv>
);

export default Layout;