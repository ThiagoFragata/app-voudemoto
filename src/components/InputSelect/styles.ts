import styled from "styled-components/native";
import { Entypo } from "@expo/vector-icons";

export const InputContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 100%;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.white};

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  margin: 6px 0 16px;
  border-radius: 16px;
`;

export const TextSelect = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black_light};
`;
