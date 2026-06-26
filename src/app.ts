import { Component, PropsWithChildren } from 'react';
import './app.scss';

class App extends Component<PropsWithChildren> {
  componentDidMount() {
    if (process.env.TARO_ENV === 'weapp') {
      const cloud = require('@tarojs/taro').cloud;
      cloud.init({
        env: '{{CLOUDBASE_ENV_ID}}',
        traceUser: true,
      });
    }
  }

  render() {
    return this.props.children;
  }
}

export default App;
