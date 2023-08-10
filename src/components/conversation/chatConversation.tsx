import React from 'react';
import {
  BotMessage,
  CustomerMessage,
  MessageContainer,
  MessageDetails,
  BackButton,
} from './chatConversation.style.js';

const ChatConversations = ({ customerId, onBackClick }) => {
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3434/chats/getChat/${customerId}`);
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        const data = await response.json();

        if (data?.messages) {
          setMessages(data.messages);
        }
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData();
  }, [customerId]);

  return (
    <div>
      <BackButton onClick={onBackClick}>Back to Customer List</BackButton>
      <MessageContainer>
        {loading ? (
          <div>Loading...</div>
        ) : messages?.length > 0 ? (
          messages.map((message) => (
            <React.Fragment key={message._id}>
              {message.sender === 'customer' ? (
                <CustomerMessage>
                  {message.message}
                  <MessageDetails className="message-details">
                    {new Date(message.timestamp).toLocaleString()}
                  </MessageDetails>
                </CustomerMessage>
              ) : (
                <BotMessage>
                  {message.message}
                  <MessageDetails className="message-details" alignRight>
                    {new Date(message.timestamp).toLocaleString()}
                  </MessageDetails>
                </BotMessage>
              )}
            </React.Fragment>
          ))
        ) : (
          <div>No conversation data available for this customer.</div>
        )}
      </MessageContainer>
    </div>
  );
};

export default ChatConversations;
