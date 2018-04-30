import React, { Component } from 'react';
import Layout from './Components/Layout';
import Chatbox from './Components/Chatbox';
import Sidebar from './Components/Sidebar';
import UsernameForm from './Components/Username';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUsername: '',
      currentId: '',
      currentScreen: 'usernameInputScreen'
    };
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this);
  }

  onUsernameSubmitted(username) {
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          currentId: data.id,
          currentUsername: data.name,
          currentScreen: 'chatScreen'
        });
      })
      .catch(error => console.error('error', error));
  }

  render() {
    if (this.state.currentScreen === 'usernameInputScreen') {
      return <UsernameForm handleSubmit={this.onUsernameSubmitted} />;
    }
    if (this.state.currentScreen === 'chatScreen') {
      return (
        <Layout
          currentId={this.state.currentId}
          Sidebar={Sidebar}
          Chatbox={Chatbox}
        />
      );
    }
  }
}

export default App;
