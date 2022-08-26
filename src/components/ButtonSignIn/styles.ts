import styled from "styled-components/native";

export const ButtonSign = styled.TouchableOpacity`
  height: 56px;
  background: ${({ theme }) => theme.colors.white};
  align-items: center;
  flex-direction: row;
  border-radius: 8px;
  border: 0;

  margin-bottom: 16px;
`;

export const ImageButton = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;

  padding: 16px;
  border-color: ${({ theme }) => theme.colors.black_light};
  border-right-width: 1px;
`;

export const TextButton = styled.Text`
  flex: 1;
  text-align: center;
  color: ${({ theme }) => theme.colors.black_dark};
  font-size: 16px;
  font-weight: 700;
`;
