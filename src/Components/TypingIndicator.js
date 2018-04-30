import React from 'react';

const TypingIndicator = ({ usersWhoAreTyping }) => {
  if (usersWhoAreTyping.length > 0) {
    return (
      <div>
        {`${usersWhoAreTyping.slice(0, 2).join(' and ')} is typing`}
      </div>
    );
  }
  return <div />;
};

export default TypingIndicator;
