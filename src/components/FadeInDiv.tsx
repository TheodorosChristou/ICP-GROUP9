import React from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

// Define the fadeIn animation
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Styled component with the fadeIn animation
const FadingDiv = styled.div`
  animation: ${fadeIn} 1.5s ease-in-out;
`;

interface FadeInDivProps {
  children: React.ReactNode;
}

const FadeInDiv: React.FC<FadeInDivProps> = ({ children }) => {
  return (
    <FadingDiv>
      {children}
    </FadingDiv>
  );
};

export default FadeInDiv;