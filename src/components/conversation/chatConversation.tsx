import { ApiClient } from 'adminjs';
import React from 'react';
import {
  BackButton,
  BotMessage,
  CustomerMessage,
  InputContainer,
  MessageContainer,
  MessageDetails,
  SendButton,
  StyledInput,
} from './chatConversation.style.js';

interface Props {
  customerId: string;
  titleBack: string;
  onBackClick: () => void;
}

const ChatConversations = ({ customerId, onBackClick, titleBack }: Props) => {
  const api = new ApiClient();
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingSending, setLoadingSending] = React.useState(false);
  const [newMessage, setNewMessage] = React.useState('');
  const [apiURI, setApiURI] = React.useState('');

  React.useEffect(() => {
    const fetchServerSide = async () => {
      try {
        const response: any = await api.getPage({
          pageName: 'chat',
        });

        const { data } = response;

        if (data?.apiURI) {
          setApiURI(data.apiURI);
        }
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchServerSide();
  }, []);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = React.useCallback(async () => {
    try {
      setLoadingSending(true);
      setNewMessage('');
      const response = await fetch(`${apiURI}/chats/customers/${customerId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      // Assuming the API responds with the updated messages
      const data = await response.json();

      if (data?.messages) {
        setMessages(data.messages);
        console.log('Msg sent');
        setLoadingSending(false);
      }

      // Clear the input field
      setNewMessage('');
    } catch (error) {
      setLoadingSending(false);
      console.error('Error sending message:', error);
    }
  }, [customerId, apiURI, newMessage, loadingSending]);

  React.useEffect(() => {
    if (!apiURI || !customerId) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiURI}/chats/customers/${customerId}`);
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        const data = await response.json();
        console.log('data', data);

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
  }, [customerId, apiURI]);

  return (
    <div
      style={{
        padding: '1em',
        background: 'white',
        borderRadius: '1em',
      }}
    >
      <BackButton onClick={onBackClick}>{titleBack}</BackButton>
      <MessageContainer>
        {loading ? (
          <div>Loading...</div>
        ) : messages?.length > 0 ? (
          <>
            {messages.map((message) => (
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
            ))}
            {loadingSending && (
              <div style={{ width: '100%', textAlign: 'center', marginTop: '1rem' }}>
                Sending...
              </div>
            )}
          </>
        ) : (
          <div>No conversation data available for this customer.</div>
        )}
      </MessageContainer>
      <InputContainer>
        <StyledInput
          type="text"
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Type your message..."
        />
        <SendButton onClick={handleSendMessage}>Send</SendButton>
      </InputContainer>
    </div>
  );
};

export default ChatConversations;
