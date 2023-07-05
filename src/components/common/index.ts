import { Box } from '@adminjs/design-system';
import { styled } from '@adminjs/design-system/styled-components';

export const Page = styled(Box)`
  background: rgb(248, 249, 249);
  padding: 32px;
  box-sizing: border-box;
`;

export const Card = styled(Box)`
  border-radius: 8px;
  padding: 16px;
  box-sizing: border-box;
  background-color: white;
  margin-bottom: 16px;
`;

export const Title = styled('h1')`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const CardTitle = styled('h1')`
  font-size: 18px;
  font-weight: 400;
`;

export const Flex = styled('div')<{ $marginTop?: string }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: ${({ $marginTop }) => $marginTop};
`;

export const Section = styled('div')<{ $width?: string; $height?: string; $padding: string }>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  padding: ${({ $padding }) => $padding};
`;

export const ValueText = styled('p')<{ $lineHeight?: string }>`
  font-size: 26px;
  font-weight: bold;
  line-height: ${({ $lineHeight }) => $lineHeight ?? '50px'};
  text-align: center;
`;
