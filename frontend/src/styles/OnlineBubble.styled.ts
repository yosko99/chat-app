import styled from 'styled-components';

const OnlineBubble = styled.div<{ isOnline?: boolean }>`
  background-color: ${(props) => (props.isOnline ? 'green' : 'gray')};
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

export default OnlineBubble;
