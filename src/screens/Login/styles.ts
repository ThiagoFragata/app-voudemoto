import styled from "styled-components/native";

export const SafeContainer = styled.View`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary_light};
  padding: 16px;
`;

export const ImageLogin = styled.Image`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export const Main = styled.View`
  margin-top: 110%;
  margin-bottom: 24px;

  align-items: center;
`;

export const Box = styled.View`
  width: 100%;
  flex-direction: column;
  padding: 16px;
`;

export const LabelButtonLogin = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  font-size: 16px;
`;

interface Props {
  space?: string;
}

export const Spacer = styled.View<Props>`
  height: ${({ space }) => (space ? space : "8px")};
  width: 100%;
`;
