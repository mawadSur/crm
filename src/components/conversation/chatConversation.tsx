import React, { useState } from 'react';
import {
  BotMessage,
  CustomerMessage,
  MessageContainer,
  MessageDetails,
  BackButton,
  InputContainer,
  StyledInput,
  SendButton,
} from './chatConversation.style.js';

const ChatConversations = ({ customerId, onBackClick }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    // Send the new message to the API and update the messages

    const fetchUrl =
      process.env.USE_LOCAL === 'true'
        ? `${process.env.FETCH_URL}/api/chats/sendMessage`
        : 'api/chats/sendMessage';

    try {
      const response = await fetch(`${fetchUrl}/${customerId}`, {
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

        // Fetch customer information
        const customerInfoResponse = await fetch(`/api/customers/${customerId}`);
        if (!customerInfoResponse.ok) {
          throw new Error(`API request failed with status: ${customerInfoResponse.status}`);
        }
        const customerInfoData = await customerInfoResponse.json();

        if (customerInfoData?.phoneNumber) {
          sendToPhoneNumber(customerInfoData.phoneNumber, newMessage);
          console.log('Message sent to phone number:', customerInfoData.phoneNumber);
        }
        console.log('Msg sent');
      }

      // Clear the input field
      setNewMessage('');
    } catch (error) {
      console.log('error :' + error);

      console.error('Error sending message:', error);
    }
  };

  const sendToPhoneNumber = async (phoneNumber, context) => {
    const apiUrl = 'https://prnnfaqhaojrjnxqtrhr6lirpq0qclho.lambda-url.us-east-1.on.aws/';

    const payload = {
      action: 'send',
      phone: phoneNumber,
      context: context,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      console.log('Message sent successfully');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  React.useEffect(() => {
    const fetchUrl =
      process.env.USE_LOCAL === 'true'
        ? `${process.env.FETCH_URL}/api/chats/getChat`
        : '/api/chats/getChat';

    const fetchData = async () => {
      try {
        const response = await fetch(`${fetchUrl}/${customerId}`);
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
