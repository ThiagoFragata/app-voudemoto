import styled from "styled-components/native";

//screen type
export const Background = styled.Image`
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const Card = styled.TouchableOpacity`
  max-width: 148px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 8px;
  border-radius: 8px;

  margin: 32px 16px;
`;

export const Paragraph = styled.Text`
  margin: 8px 4px;
  text-align: center;
  color: ${({ theme }) => theme.colors.black_dark};
`;
