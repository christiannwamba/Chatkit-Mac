import React from 'react';
import Chatkit from '@pusher/chatkit';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: [],
      currentUsername: '',
      currentScreen: 'usernameInputScreen',
      usersWhoAreTyping: []
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.sendTypingEvent = this.sendTypingEvent.bind(this);
  }

  sendTypingEvent() {
    this.state.currentUser
      .isTypingIn({ roomId: this.state.currentRoom.id })
      .catch(error => console.error('error', error));
  }

  sendMessage(text) {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id
    });
  }
  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:6061072e-71d1-492e-9989-20258f1fc9ca',
      userId: this.props.currentId,
      tokenProvider: new Chatkit.TokenProvider({
        url: 'http://localhost:3001/authenticate'
      })
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser });
        return currentUser.subscribeToRoom({
          roomId: 6963803,
          messageLimit: 100,
          hooks: {
            onNewMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              });
            },
            onUserStartedTyping: user => {
              this.setState({
                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
              });
            },
            onUserStoppedTyping: user => {
              this.setState({
                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                  username => username !== user.name
                )
              });
            },

            onUserCameOnline: () => this.forceUpdate(),
            onUserWentOffline: () => this.forceUpdate(),
            onUserJoined: () => this.forceUpdate()
          }
        });
      })
      .then(currentRoom => {
        this.setState({ currentRoom });
      })
      .catch(error => console.error('error', error));
  }
  render() {
    const { Chatbox, Sidebar } = this.props;
    return (
      <div className="wrapper">
        <div className="left">
          <Sidebar
            currentUser={this.state.currentUser}
            users={this.state.currentRoom.users}
            usersWhoAreTyping={this.state.usersWhoAreTyping}
          />
        </div>

        <div className="right">
          <Chatbox
            messages={this.state.messages}
            sendMessage={this.sendMessage}
            onChange={this.sendTypingEvent}
            sendTypingEvent={this.sendTypingEvent}
            usersWhoAreTyping={this.state.usersWhoAreTyping}
          />
        </div>
      </div>
    );
  }
}

export default Layout;
