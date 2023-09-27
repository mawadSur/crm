import React from 'react';
import ChatConversations from '../../../components/conversation/chatConversation.js';
import { useNavigate } from 'react-router-dom';

const RedirectComponent = (props) => {
  console.log('props', props);
  const navigate = useNavigate();
  return (
    <ChatConversations
      customerId={props.record.id}
      onBackClick={() => navigate(-1)}
      titleBack="Back To Customer"
    />
  );
};

export default RedirectComponent;
