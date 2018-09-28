import * as React from "react";

interface Props {
  component: React.ComponentType<any>;
  getData: () => Promise<any>;
  staticContext: any;
  loader: React.ComponentType;
}

class AsyncRoute extends React.Component<Props, { data?: object }> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: process.env.IS_BROWSER ? window.__INITIAL_DATA__ : undefined
    };

    if (process.env.IS_BROWSER) {
      delete window.__INITIAL_DATA__;
    }
  }

  componentDidMount() {
    if (!this.state.data) {
      this.props.getData().then(data => {
        this.setState({ data });
      });
    }
  }

  public render() {
    const {
      component: Component,
      staticContext,
      loader: Loader,
      ...props
    } = this.props;
    if (process.env.IS_BROWSER) {
      if (this.state.data) {
        return <Component data={this.state.data} {...props} />;
      } else {
        return <Loader />;
      }
    } else {
      const data = staticContext.data || {};
      return <Component data={data} {...props} />;
    }
  }
}

export { AsyncRoute };
