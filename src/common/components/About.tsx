import * as React from "react";
import styled from "styled-components";

const Title = styled.h1`
  color: red;
`;

class About extends React.Component<{}> {
  public render() {
    return <Title>Page2</Title>;
  }
}

export { About };
