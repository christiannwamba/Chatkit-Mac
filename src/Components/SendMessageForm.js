import React, { Component } from 'react';
import { Button, TextInput } from 'react-desktop/macOs';

class SendMessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.text);
    this.setState({ text: '' });
  }

  onChange = e => {
    this.setState({ text: e.target.value });
    if (this.props.onChange) {
      this.props.onChange();
    }
  };

  render() {
    return (
      <div>
        <div className="">
          <form onSubmit={this.onSubmit} className="message">
            <div>
              <TextInput
                type="text"
                placeholder="Type a message here then hit ENTER"
                onChange={this.onChange}
                value={this.state.text}
                className="message-text"
              />
            </div>
            <div>
              <Button color="blue" type="submit">
                Send
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SendMessageForm;
