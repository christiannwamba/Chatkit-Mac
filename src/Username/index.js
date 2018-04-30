import React, { Component } from 'react';
import { TextInput } from 'react-desktop/macOs';
import { Button } from 'react-desktop/macOs';
import './Username.css';

class UsernameForm extends Component {
  constructor() {
    super();
    this.state = {
      username: ''
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSubmit(this.state.username);
  };

  handleChange = e => {
    this.setState({ username: e.target.value });
  };

  render() {
    return (
      <div>
        <form className="username" onSubmit={this.handleSubmit}>
          <h2>What is your username?</h2>
          <div>
            <div>
              <TextInput
                label="Enter Your Username"
                placeholder="Username..."
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <Button color="blue" type="submit" padding="2px 10px">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default UsernameForm;
