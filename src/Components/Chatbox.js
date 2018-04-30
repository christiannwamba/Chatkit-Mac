import React, { Component } from 'react';
import {
  ListView,
  ListViewSection,
  ListViewSectionHeader,
  ListViewRow,
  Text
} from 'react-desktop/macOs';
import SendMessageForm from './SendMessageForm';
import TypingIndicator from './TypingIndicator';

class Chatbox extends Component {
  render() {
    return (
      <div>
        <ListView background="#f1f2f4" width="500" height="555">
          <ListViewSection header={this.renderSectionHeader('Messages')}>
            {this.props.messages.map((message, index) =>
              this.renderItem(message)
            )}
          </ListViewSection>
        </ListView>
        <TypingIndicator usersWhoAreTyping={this.props.usersWhoAreTyping} />
        <SendMessageForm
          onSubmit={this.props.sendMessage}
          onChange={this.props.sendTypingEvent}
        />
      </div>
    );
  }

  renderSectionHeader(title) {
    return <ListViewSectionHeader>{title}</ListViewSectionHeader>;
  }

  renderItem(message) {
    return (
      <ListViewRow key={message.id}>
        <Text color="#414141" size="13" bold>
          {message.sender.name}:
        </Text>
        <Text color="#414141" size="13">
          {message.text}
        </Text>
      </ListViewRow>
    );
  }
}

export default Chatbox;
