import React,{Component} from 'react';
import Layout from './components/Layout/Layout'


class App extends Component {
  render() {
    return (
      <div className="App">
        <p>This is Burger App</p>
        <Layout>
          <p>Test</p>
        </Layout>
      </div>
    );
  }
  
}

export default App;
