import React, { Component } from 'react';
import {
  ListView,
  ListViewSection,
  ListViewSectionHeader,
  ListViewRow,
  Text
} from 'react-desktop/macOs';

class Sidebar extends Component {
  constructor() {
    super();
    this.state = { selected: null };
  }

  render() {
    return (
      <ListView background="#e1e1e1" width="300" height="600">
        <ListViewSection header={this.renderSectionHeader('Users')}>
          {this.props.users &&
            this.props.users.map((user, index) => {
              if (user.id === this.props.currentUser.id) {
                return this.renderItem(`${user.name} (You)`, user.id, user.presence.state);
              }
              return this.renderItem(user.name, user.id, user.presence.state);
            })}
        </ListViewSection>
      </ListView>
    );
  }

  renderSectionHeader(title) {
    return <ListViewSectionHeader>{title}</ListViewSectionHeader>;
  }

  renderItem(name, id, status) {
    const itemStyle = {
      width: '10px',
      height: '10px',
      background: status === 'online' ? 'green' : 'gray',
      borderRadius: '50%',
      marginRight: '5px'
    };
    return (
      <ListViewRow key={id}>
        <div style={itemStyle} />
        <Text color="#414141" size="13">
          {name}
        </Text>
      </ListViewRow>
    );
  }
}

export default Sidebar;
