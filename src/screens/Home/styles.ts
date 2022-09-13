import styled from "styled-components/native";

interface Props {
  small?: boolean;
  align?: string;
}

export const ContainerHome = styled.SafeAreaView`
  flex: 1;
  width: 100%;

  background-color: ${({ theme }) => theme.colors.white};
`;

interface AvatarProps {
  top?: string;
}

export const AvatarCard = styled.TouchableOpacity<AvatarProps>`
  position: absolute;
  top: ${({ top }) => (top ? top : 0)};

  align-self: flex-start;

  flex-direction: row;
  align-items: center;

  padding: 16px;
`;

export const Avatar = styled.Image<Props>`
  width: ${({ small }) => (small ? "35px" : "50px")};
  height: ${({ small }) => (small ? "35px" : "50px")};
  border-radius: ${({ small }) => (small ? "35px" : "50px")};

  background-color: ${({ theme }) => theme.colors.yellow_light};
  margin-right: 8px;

  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
`;

export const TitleAvatar = styled.Text<Props>`
  color: ${({ theme }) => theme.colors.black_dark};
  font-weight: bold;
  text-align: ${({ align }) => (align ? align : "left")};
`;

export const SubtitleAvatar = styled.Text<Props>`
  text-align: ${({ align }) => (align ? align : "left")};
  color: ${({ theme }) => theme.colors.black_light};
  font-weight: normal;
  margin-bottom: 4px;
`;

export const BoxHome = styled.View.attrs({
  elevation: 50,
})`
  position: absolute;
  bottom: 32px;
  align-self: center;

  border-radius: 16px;
  width: 90%;

  padding: 16px;

  background-color: ${({ theme }) => theme.colors.white};
`;

interface HeaderHomeProps {
  marginTop: string;
}

export const HeaderHome = styled.View.attrs({
  elevation: 50,
})`
  position: absolute;
  top: ${({ top }) => (top ? top : 0)};
  align-self: center;

  border-radius: 16px;
  width: 90%;

  padding: 16px;

  background-color: ${({ theme }) => theme.colors.white};
`;

interface PropsCard {
  align?: string;
  justify?: string;
  direction?: string;
}

export const Card = styled.View<PropsCard>`
  flex-direction: ${({ direction }) => (direction ? direction : "row")};
  align-items: ${({ align }) => (align ? align : "center")};
  justify-content: ${({ justify }) => (justify ? justify : "space-around;")};
  margin: 16px 0;
`;

export const Item = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.black_dark};
`;

export const Span = styled.Text`
  font-size: 16px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.black_dark};
`;

export const Address = styled.View`
  margin-bottom: 16px;
`;

export const Overlay = styled.View`
  position: absolute;
  z-index: 999;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px;
  pointer-events: none;
  background-color: ${({ theme }) => theme.colors.danger_100};
  opacity: 0.2;

  height: 100%;
  width: 100%;
`;

export const ContainerPulse = styled.View`
  position: absolute;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;
`;

export const InputSearchRide = styled.TextInput`
  border: 1px solid ${({ theme }) => theme.colors.light};
  margin-top: 16px;
  padding: 8px;
  border-radius: 8px;
`;

interface ButtonCallDrive {
  type: "C" | "F";
}

export const ButtonCallDrive = styled.TouchableOpacity`
  border-radius: 12px;
  padding: 8px 16px;
  background-color: ${({ theme, type }) =>
    type === "C" ? theme.colors.success_100 : theme.colors.danger_100};
`;
