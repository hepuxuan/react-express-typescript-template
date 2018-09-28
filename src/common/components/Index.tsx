import * as React from "react";
import styled from "styled-components";
import { INews } from "../models/news";

const Title = styled.h1`
  color: red;
`;

class Index extends React.Component<{ data: INews[] }> {
  public render() {
    return (
      <div>
        <Title>Page1</Title>
        {this.props.data.map(({ content, title }) => (
          <p key={title}>{content}</p>
        ))}
      </div>
    );
  }
}

export { Index };
