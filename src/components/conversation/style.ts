import { styled } from '@adminjs/design-system/styled-components';

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const MessageBubble = styled.div`
  max-width: 70%;
  padding: 10px 20px;
  border-radius: 20px;
  margin: 5px;
  position: relative;
  transition: background-color 0.2s, transform 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #f3f3f3;
    transform: scale(1.05);

    .message-details {
      opacity: 1;
    }
  }
`;

export const CustomerMessage = styled(MessageBubble)`
  background-color: #dcf8c6;
  align-self: flex-start;
`;

export const BotMessage = styled(MessageBubble)`
  background-color: #e5e5ea;
  align-self: flex-end;
`;

export const MessageDetails = styled.div`
  position: absolute;
  bottom: -20px;
  ${({ alignRight }) => (alignRight ? 'right: 0;' : 'left: 0;')}
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 2px 5px;
  border-radius: 5px;
  opacity: 0;
  font-size: 12px;
  transition: opacity 0.2s;
`;
